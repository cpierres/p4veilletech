package com.cpierres.p4veilletech.backend.web;

import com.cpierres.p4veilletech.backend.service.GitHubReadmeUpsertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Endpoints:
 * - POST /webhook/github  => reçoit les événements push GitHub et upsert le README du dépôt concerné
 * - POST /admin/github/sync-all => lance une synchro initiale depuis le fichier d'évaluations
 */
@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
public class GithubSyncController {

    private final GitHubReadmeUpsertService upsertService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${github.webhook.secret:}")
    private String githubWebhookSecret;

    /**
     * Webhook GitHub (événement push). Le payload standard contient:
     * {
     *   "repository": { "name": "repo", "owner": { "name": "owner", "login": "owner" } }
     * }
     * On essaie d'en extraire owner & repo pour upserter le README.
     */
    @PostMapping("/webhook/github")
    public ResponseEntity<?> onGitHubEvent(
            @RequestHeader(value = "X-Hub-Signature-256", required = false) String signature,
            @RequestHeader(value = "X-GitHub-Event", required = false) String event,
            @RequestBody byte[] rawBody
    ) {
        try {
            // Vérification du secret / signature HMAC-SHA256
            if (githubWebhookSecret == null || githubWebhookSecret.isBlank()) {
                log.warn("[Webhook] Secret non configuré (github.webhook.secret)");
                return ResponseEntity.status(500).body("webhook secret non configuré");
            }

            if (signature == null || !signature.startsWith("sha256=")) {
                return ResponseEntity.status(401).body("signature manquante ou invalide");
            }

            String expected = "sha256=" + hmacSha256Hex(rawBody, githubWebhookSecret.getBytes(StandardCharsets.UTF_8));
            if (!constantTimeEquals(expected, signature)) {
                return ResponseEntity.status(401).body("signature invalide");
            }

            // Gestion de l'event ping (healthcheck GitHub)
            if ("ping".equalsIgnoreCase(event)) {
                return ResponseEntity.ok(Map.of("pong", true));
            }

            // À partir d'ici, la signature est validée: on peut parser et traiter
            Map<String, Object> payload = objectMapper.readValue(rawBody, Map.class);

            Map<String, Object> repo = (Map<String, Object>) payload.get("repository");
            if (repo == null) return ResponseEntity.badRequest().body("repository manquant");
            String repoName = String.valueOf(repo.get("name"));
            Map<String, Object> ownerObj = (Map<String, Object>) repo.get("owner");
            String owner = ownerObj != null && ownerObj.get("login") != null
                ? String.valueOf(ownerObj.get("login"))
                : (ownerObj != null && ownerObj.get("name") != null ? String.valueOf(ownerObj.get("name")) : null);
            if (owner == null || repoName == null) return ResponseEntity.badRequest().body("owner/repo manquants");

            boolean ok = upsertService.upsertReadme(new GitHubReadmeUpsertService.RepoRef(owner, repoName));
            return ResponseEntity.ok(Map.of("status", ok ? "ok" : "skipped"));
        } catch (Exception e) {
            log.error("[Webhook] Erreur de traitement push GitHub", e);
            return ResponseEntity.internalServerError().body("error");
        }
    }

    /**
     * Déclenche une synchro initiale/adhoc: lit la liste des dépôts dans le fichier d'évaluations
     * et upserte chaque README. Idempotent grâce au cache de hash.
     */
    @PostMapping("/admin/github/sync-all")
    public ResponseEntity<?> syncAll() {
        int count = upsertService.syncAllFromEval();
        return ResponseEntity.ok(Map.of("processed", count));
    }

    private static String hmacSha256Hex(byte[] data, byte[] key) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key, "HmacSHA256"));
        byte[] h = mac.doFinal(data);
        StringBuilder sb = new StringBuilder(h.length * 2);
        for (byte b : h) sb.append(String.format("%02x", b));
        return sb.toString();
    }

    private static boolean constantTimeEquals(String a, String b) {
        if (a == null || b == null) return false;
        byte[] ba = a.getBytes(StandardCharsets.UTF_8);
        byte[] bb = b.getBytes(StandardCharsets.UTF_8);
        if (ba.length != bb.length) return false;
        int result = 0;
        for (int i = 0; i < ba.length; i++) result |= ba[i] ^ bb[i];
        return result == 0;
    }
}
