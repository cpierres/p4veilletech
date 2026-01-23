package com.cpierres.p4veilletech.backend.util;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Properties;

/**
 * Petit index persistant clé -> hash (SHA-256) pour éviter les ré-embeddings
 * inutiles au redémarrage. Créé à la volée et tolérant aux erreurs d'E/S.
 *
 * Emplacements tentés dans l'ordre (fallback):
 *  1) backend/data/content-hash-index.properties
 *  2) ./data/content-hash-index.properties
 *  3) ${user.home}/.p4veilletech/content-hash-index.properties
 *
 * Si tous échouent (lecture seule/droits), bascule en mode volatile (en mémoire)
 * et n'empêche pas le démarrage de l'application.
 */
@Slf4j
public class ContentHashIndex {
  private final Properties props = new Properties();
  private Path filePath;
  private boolean volatileMode = false;

  public ContentHashIndex() {
    // Liste des chemins de fallback
    Path p1 = Paths.get("backend", "data", "content-hash-index.properties");
    Path p2 = Paths.get("data", "content-hash-index.properties");
    Path p3 = Paths.get(System.getProperty("user.home", "."), ".p4veilletech", "content-hash-index.properties");

    for (Path p : List.of(p1, p2, p3)) {
      if (initAt(p)) {
        this.filePath = p;
        return;
      }
    }

    // Tous les emplacements ont échoué → mode volatile
    this.volatileMode = true;
    this.filePath = p1; // valeur indicative pour les logs
    log.warn("[HashIndex] Aucun emplacement persistant disponible. Bascule en mode volatile (en mémoire). L'index ne sera pas sauvegardé.");
  }

  public ContentHashIndex(Path filePath) {
    if (!initAt(filePath)) {
      // Si l'init explicite échoue, ne pas bloquer: passer en volatile
      this.volatileMode = true;
      this.filePath = filePath;
      log.warn("[HashIndex] Échec d'initialisation à {}. Mode volatile activé (pas de persistance).", filePath);
    } else {
      this.filePath = filePath;
    }
  }

  /**
   * Initialise l'index à l'emplacement donné: crée les répertoires/fichier si absent,
   * et charge les propriétés si présent. Ne lève pas, renvoie true/false.
   */
  private boolean initAt(Path target) {
    try {
      if (Files.exists(target)) {
        try (InputStream in = Files.newInputStream(target)) {
          props.load(in);
        }
        log.info("[HashIndex] Chargé: {} ({} entrées)", target, props.size());
        return true;
      }
      Path parent = target.getParent();
      if (parent != null) {
        Files.createDirectories(parent);
      }
      if (!Files.exists(target)) {
        Files.createFile(target);
      }
      // Fichier nouvellement créé → vide
      log.info("[HashIndex] Fichier créé: {}", target);
      return true;
    } catch (Exception e) {
      log.warn("[HashIndex] Impossible d'initialiser l'index à {}", target, e);
      return false;
    }
  }

  public String get(String key) {
    return props.getProperty(key);
  }

  public void put(String key, String hash) {
    if (hash == null) return;
    props.setProperty(key, hash);
  }

  /**
   * Retourne le nombre d'entrées dans l'index.
   */
  public int size() {
    return props.size();
  }

  /**
   * Vide complètement l'index (en mémoire). Appeler persist() ensuite pour effacer le fichier.
   */
  public void clear() {
    props.clear();
    log.info("[HashIndex] Index vidé (clear)");
  }

  /**
   * Persiste l'index si un chemin persistant est disponible; sinon, no-op avec warning.
   */
  public void persist() {
    if (volatileMode) {
      log.warn("[HashIndex] Mode volatile: persist() ignoré (aucun stockage persistant disponible).");
      return;
    }
    try {
      Path parent = filePath.getParent();
      if (parent != null) {
        Files.createDirectories(parent);
      }
      try (OutputStream out = Files.newOutputStream(filePath)) {
        props.store(out, "content-hash-index");
      }
    } catch (IOException e) {
      // Ne pas faire échouer l'appli: log + bascule en volatile pour éviter les erreurs répétées
      log.warn("[HashIndex] Échec de persist() sur {}. Passage en mode volatile (pas de persistance)", filePath, e);
      this.volatileMode = true;
    }
  }

  /**
   * Permet de rediriger le stockage (tests/profils). Ré-initialise à l'emplacement fourni.
   */
  public void setFilePath(Path newPath) {
    if (newPath == null) return;
    Properties snapshot = new Properties();
    snapshot.putAll(this.props);

    if (initAt(newPath)) {
      this.filePath = newPath;
      this.volatileMode = false;
      // Écrit l'état courant immédiatement pour assurer la cohérence
      try (OutputStream out = Files.newOutputStream(this.filePath)) {
        this.props.store(out, "content-hash-index");
      } catch (IOException e) {
        log.warn("[HashIndex] Échec d'écriture initiale après setFilePath({})", newPath, e);
      }
    } else {
      // Restaure l'état et reste en volatile
      this.props.clear();
      this.props.putAll(snapshot);
      this.volatileMode = true;
      log.warn("[HashIndex] setFilePath({}) impossible. Mode volatile conservé.", newPath);
    }
  }
}
