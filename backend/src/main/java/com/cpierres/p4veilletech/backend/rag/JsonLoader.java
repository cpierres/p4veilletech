package com.cpierres.p4veilletech.backend.rag;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class JsonLoader {
  private final VectorStore vectorStore;
  private final ObjectMapper objectMapper; // Injecté automatiquement par Spring

  @Value("${app.rag.data-path}")
  private String ragDataPath;

  private final ResourceLoader resourceLoader;

  // 1) API interne pour parser le JSON "projets-ocr.json" depuis une Resource et retourner des Documents
  public List<Document> parseProjetsOcr(Resource resource) throws IOException {
    Map<String, Object> jsonData = objectMapper.readValue(resource.getInputStream(), Map.class);
    List<Map<String, Object>> projects = (List<Map<String, Object>>) jsonData.get("projects");

    List<Document> documents = new ArrayList<>();
    for (Map<String, Object> project : projects) {
      String projectId = project.get("id").toString();
      String title = (String) project.get("title");
      String description = (String) project.get("description");
      String textContent = (String) project.get("textContent");

      // 1. Section "Liens"
      StringBuilder linksSection = new StringBuilder("\nLiens :\n");
      if (project.get("links") != null) {
        List<Map<String, String>> links = (List<Map<String, String>>) project.get("links");
        for (Map<String, String> link : links) {
          linksSection.append("- [")
            .append(link.get("text"))
            .append("](")
            .append(link.get("href"))
            .append(")\n");
        }
      } else {
        linksSection.append("Aucun lien.\n");
      }

      // 2. Section "Évaluation"
      StringBuilder evaluationSection = new StringBuilder("\nÉvaluation :\n");
      if (project.get("evaluation") != null) {
        Map<String, Object> evaluation = (Map<String, Object>) project.get("evaluation");
        evaluationSection.append("- **Évaluateur** : ").append(evaluation.get("evaluator")).append("\n");
        evaluationSection.append("- **Date** : ").append(evaluation.get("date")).append("\n");
        evaluationSection.append("- **GitHub** : ").append(evaluation.get("github")).append("\n");

        if (evaluation.get("competences") != null) {
          evaluationSection.append("- **Compétences** :\n");
          List<Map<String, Object>> competences = (List<Map<String, Object>>) evaluation.get("competences");
          for (Map<String, Object> competence : competences) {
            evaluationSection.append("  - ")
              .append(competence.get("title"))
              .append(" : ")
              .append(competence.get("status") != null ? competence.get("status") : "Non spécifié")
              .append("\n");
            if (competence.get("comments") != null) {
              evaluationSection.append("    *\"")
                .append(competence.get("comments"))
                .append("\"*\n");
            }
          }
        }

        if (evaluation.get("pointsForts") != null) {
          evaluationSection.append("- **Points forts** : ")
            .append(String.join(", ", (List<String>) evaluation.get("pointsForts")))
            .append("\n");
        }
        if (evaluation.get("axesAmelioration") != null) {
          evaluationSection.append("- **Axes d'amélioration** : ")
            .append(String.join(", ", (List<String>) evaluation.get("axesAmelioration")))
            .append("\n");
        }
        if (evaluation.get("remarques") != null) {
          evaluationSection.append("- **Remarques** : ")
            .append(evaluation.get("remarques"))
            .append("\n");
        }
      } else {
        evaluationSection.append("Aucune évaluation.\n");
      }

      // 3. Construction du contenu complet
      String content = String.format(
        "### OpenClassrooms %s : %s\n\n" +
          "**Description** : %s\n\n" +
          "**Contenu** :\n%s\n\n" +
          "%s" +  // Liens
          "%s",  // Évaluation
        projectId, title, description, textContent,
        linksSection.toString(),
        evaluationSection.toString()
      );

      // 4. Métadonnées minimales (pour filtres)
      Map<String, Object> metadata = new HashMap<>();
      metadata.put("projectId", projectId);
      metadata.put("title", title);
      if (project.get("externalId") != null) {
        metadata.put("externalId", project.get("externalId"));
      }
      if (project.get("headings") != null) {
        metadata.put("headings", project.get("headings"));
      }

      // 5. Nettoyage des métadonnées
      Map<String, Object> cleanMetadata = metadata.entrySet().stream()
        .filter(entry -> entry.getValue() != null)
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

      // 6. Création du Document
      Document document = new Document(content, cleanMetadata);
      documents.add(document);
    }
    return documents;
  }

  /**
   * API interne pour parser "udemy-training.json" et générer un Document par formation
   * @param resource
   * @return
   * @throws IOException
   */
  public List<Document> parseUdemyTrainings(Resource resource) throws IOException {
    List<Map<String, Object>> trainings = objectMapper.readValue(resource.getInputStream(), List.class);
    List<Document> documents = new ArrayList<>();

    for (Map<String, Object> tr : trainings) {
      String categorie = tr.get("categorie") != null ? tr.get("categorie").toString() : null;
      String titre = tr.get("titre") != null ? tr.get("titre").toString() : null;
      String lien = tr.get("lien") != null ? tr.get("lien").toString() : null;
      String duree = tr.get("duree") != null ? tr.get("duree").toString() : null;
      String commentaire = tr.get("commentaire") != null ? tr.get("commentaire").toString() : null;
      String classement = tr.get("classement") != null ? tr.get("classement").toString() : null;

      String finalTitle = (titre == null || titre.isBlank()) ? extractUdemyTitleFromUrl(lien) : titre;

      StringBuilder content = new StringBuilder();
      content.append("### Formation Udemy suivie par Christophe Pierrès : ").append(finalTitle).append("\n\n");
      if (categorie != null) content.append("- Catégorie : ").append(categorie).append("\n");
      if (duree != null) content.append("- Durée : ").append(duree).append("\n");
      if (lien != null) content.append("- Lien : [").append(finalTitle).append("](").append(lien).append(")\n");
      if (classement != null) content.append("- Classement : ").append(classement).append("\n");
      if (commentaire != null && !commentaire.isBlank()) content.append("- Commentaire : ").append(commentaire).append("\n");

      Map<String, Object> metadata = new HashMap<>();
      metadata.put("type", "udemy");
      if (categorie != null) metadata.put("categorie", categorie);
      if (finalTitle != null) metadata.put("title", finalTitle);
      if (lien != null) metadata.put("lien", lien);
      if (duree != null) metadata.put("duree", duree);
      if (classement != null) metadata.put("classement", classement);

      Document document = new Document(content.toString(), metadata);
      documents.add(document);
    }
    return documents;
  }

  private String extractUdemyTitleFromUrl(String url) {
    if (url == null) return "Cours Udemy";
    int idx = url.indexOf("/course/");
    if (idx >= 0) {
      String sub = url.substring(idx + "/course/".length());
      int end = sub.indexOf('/');
      if (end >= 0) sub = sub.substring(0, end);
      sub = sub.replace('-', ' ').trim();
      return sub.isBlank() ? "Cours Udemy" : sub;
    }
    return "Cours Udemy";
  }

//  @PostConstruct
//  public void loadJson() {
//    JsonReader jsonReader = JsonReader.Builder(jsonFile);
//    List<Document> documents = jsonReader.get();
//    log.info("Loaded {} documents", documents.size());
//    for (Document document : documents) {
//      log.info("Loaded Document {}", document);
//    }
//    this.vectorStore.add(documents);
//  }

  // 3) Compatibilité avec le chargement initial existant
  public void loadJson() throws IOException {
    // Si ragDataPath ne se termine pas par skills-data mais qu'il contient ce sous-répertoire, on l'ajoute
    String effectivePath = ragDataPath;
    if (!effectivePath.endsWith("skills-data") && !effectivePath.endsWith("skills-data/")) {
        Resource subDir = resourceLoader.getResource(effectivePath + "/skills-data");
        if (subDir.exists()) {
            effectivePath = effectivePath + "/skills-data";
        }
    }

    String path = effectivePath + "/json/projets-ocr.json";
    Resource resource = resourceLoader.getResource(path);
    if (!resource.exists()) {
      log.warn("Fichier non trouvé pour loadJson initial : {}", path);
      return;
    }
    List<Document> documents = parseProjetsOcr(resource);
    log.info("Loaded {} projects with full content (links + evaluations) from {}", documents.size(), path);
    this.vectorStore.add(documents);
  }
}
