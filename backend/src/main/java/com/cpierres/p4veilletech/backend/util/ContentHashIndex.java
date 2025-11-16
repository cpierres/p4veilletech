package com.cpierres.p4veilletech.backend.util;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

/**
 * Petit index persistant clé -> hash (SHA-256) pour éviter les ré-embeddings
 * inutiles au redémarrage. Stocké dans backend/data/content-hash-index.properties.
 */
@Slf4j
public class ContentHashIndex {
  private final Properties props = new Properties();
  private final Path filePath;

  public ContentHashIndex() {
    this(Paths.get("backend", "data", "content-hash-index.properties"));
  }

  public ContentHashIndex(Path filePath) {
    this.filePath = filePath;
    try {
      if (Files.exists(filePath)) {
        try (InputStream in = Files.newInputStream(filePath)) {
          props.load(in);
        }
      } else {
        Files.createDirectories(filePath.getParent());
        Files.createFile(filePath);
      }
    } catch (IOException e) {
      log.warn("[HashIndex] Impossible d'initialiser l'index {}", filePath, e);
    }
  }

  public String get(String key) {
    return props.getProperty(key);
  }

  public void put(String key, String hash) {
    if (hash == null) return;
    props.setProperty(key, hash);
  }

  public void persist() {
    try (OutputStream out = Files.newOutputStream(filePath)) {
      props.store(out, "content-hash-index");
    } catch (IOException e) {
      log.warn("[HashIndex] Échec de persist() {}", filePath, e);
    }
  }
}
