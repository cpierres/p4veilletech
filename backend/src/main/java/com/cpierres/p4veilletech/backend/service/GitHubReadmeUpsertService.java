package com.cpierres.p4veilletech.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.document.DocumentTransformer;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Service d'upsert pour les README GitHub, utilisé par:
 * - le bootstrap initial au démarrage (lecture du fichier d'évaluations)
 * - l'endpoint webhook GitHub (événements push)
 *
 * Objectif: éviter les doublons dans pgvector et ne ré-embedder que si le contenu a changé.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GitHubReadmeUpsertService {

    private final VectorStore vectorStore;
    private final DocumentTransformer textSplitter;
    private final VectorStoreMaintenance maintenance;
    private final ResourceLoader resourceLoader;
    private final com.cpierres.p4veilletech.backend.util.ContentHashIndex hashIndex;

    @Value("${app.github.token:}")
    private String githubToken;

    @Value("${app.github.default-branch:main}")
    private String defaultBranch;

    @Value("${app.github.eval-file:classpath:skills-data/md/ocr-projets-descriptions-evaluations/projets-openclassrooms-evaluations.md}")
    private String evalFileLocation;

    private static final Pattern REPO_URL = Pattern.compile("https?://github\\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)(?:/.*)?");

    public int syncAllFromEval() {
        try {
            Resource res = resourceLoader.getResource(evalFileLocation);
            if (!res.exists()) {
                log.warn("[GitHubUpsert] Fichier d'évaluation introuvable: {}", evalFileLocation);
                return 0;
            }
            String content = readAll(res.getInputStream());
            Set<String> repos = extractRepos(content);
            int ok = 0;
            for (String r : repos) {
                Optional<RepoRef> ref = parseRepo(r);
                if (ref.isEmpty()) continue;
                if (upsertReadme(ref.get())) ok++;
            }
            hashIndex.persist();
            return ok;
        } catch (Exception e) {
            log.warn("[GitHubUpsert] syncAllFromEval() erreur", e);
            return 0;
        }
    }

    public boolean upsertReadme(RepoRef ref) {
        try {
            String docKey = docKey(ref);
            String readme = fetchReadmeContent(ref);
            if (readme == null || readme.isBlank()) {
                log.warn("[GitHubUpsert] README absent pour {}", ref);
                return false;
            }
            String sha = sha256(readme);
            String prev = hashIndex.get(docKey);
            if (sha != null && sha.equals(prev)) {
                log.info("[GitHubUpsert] SKIP (inchangé): {}", docKey);
                return true;
            }

            // Delete anciens chunks pour ce docKey (même source)
            try {
                maintenance.deleteBySource(docKey);
            } catch (Exception ex) {
                log.warn("[GitHubUpsert] deleteBySource échoué pour {} (continue)", docKey, ex);
            }

            // Split + add
            Document d = new Document(readme);
            d.getMetadata().put("source", docKey);
            List<Document> chunks = new ArrayList<>(textSplitter.apply(List.of(d)));
            vectorStore.add(chunks);
            hashIndex.put(docKey, sha);
            log.info("[GitHubUpsert] Upsert OK pour {} ({} chunks)", docKey, chunks.size());
            return true;
        } catch (Exception e) {
            log.error("[GitHubUpsert] Échec upsert pour {}", ref, e);
            return false;
        }
    }

    public Optional<RepoRef> parseRepo(String url) {
        Matcher m = REPO_URL.matcher(url);
        if (!m.find()) return Optional.empty();
        return Optional.of(new RepoRef(m.group(1), m.group(2)));
    }

    public Set<String> extractRepos(String text) {
        Set<String> out = new LinkedHashSet<>();
        Matcher m = REPO_URL.matcher(text);
        while (m.find()) out.add(m.group(0));
        return out;
    }

    private String docKey(RepoRef ref) {
        return "github:" + ref.owner + "/" + ref.repo + "/README.md";
    }

    private String fetchReadmeContent(RepoRef ref) throws IOException {
        // 1) GitHub API avec Accept: raw
        String api = String.format("https://api.github.com/repos/%s/%s/readme", ref.owner, ref.repo);
        String body = httpGet(api, true);
        if (body != null) return body;
        // 2) raw
        for (String br : List.of(defaultBranch, "master")) {
            String raw = String.format("https://raw.githubusercontent.com/%s/%s/%s/README.md", ref.owner, ref.repo, br);
            body = httpGet(raw, false);
            if (body != null) return body;
            for (String v : List.of("Readme.md", "readme.md", "README.MD")) {
                raw = String.format("https://raw.githubusercontent.com/%s/%s/%s/%s", ref.owner, ref.repo, br, v);
                body = httpGet(raw, false);
                if (body != null) return body;
            }
        }
        return null;
    }

    private String httpGet(String url, boolean api) throws IOException {
        HttpURLConnection conn = (HttpURLConnection) URI.create(url).toURL().openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(15000);
        conn.setReadTimeout(15000);
        if (api) {
            conn.setRequestProperty("Accept", "application/vnd.github.raw");
            conn.setRequestProperty("User-Agent", "p4veilletech");
            if (githubToken != null && !githubToken.isBlank()) {
                conn.setRequestProperty("Authorization", "Bearer " + githubToken);
            }
        }
        int code = conn.getResponseCode();
        if (code >= 200 && code < 300) {
            try (InputStream in = conn.getInputStream()) {
                return readAll(in);
            }
        }
        return null;
    }

    private String readAll(InputStream in) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) sb.append(line).append('\n');
            return sb.toString();
        }
    }

    private String sha256(String text) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] dig = md.digest(text.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : dig) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            return null;
        }
    }

    public record RepoRef(String owner, String repo) {
        @Override public String toString() { return owner + "/" + repo; }
    }
}
