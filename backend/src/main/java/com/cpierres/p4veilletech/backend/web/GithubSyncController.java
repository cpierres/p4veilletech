package com.cpierres.p4veilletech.backend.web;

import com.cpierres.p4veilletech.backend.service.GitHubReadmeUpsertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Webhook GitHub (événement push). Le payload standard contient:
     * {
     *   "repository": { "name": "repo", "owner": { "name": "owner", "login": "owner" } }
     * }
     * On essaie d'en extraire owner & repo pour upserter le README.
     */
    @PostMapping("/webhook/github")
    public ResponseEntity<?> onGitHubEvent(@RequestBody Map<String, Object> payload) {
        try {
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
}
