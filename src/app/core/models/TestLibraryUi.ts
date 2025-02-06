export interface TestLibraryUi {
  nom: string;
  typeDeTest: string;
  caracteristiques: string[];
  pointsForts: string[];
  pointsFaibles: string[];
  references: {
    siteOfficiel: string;
    github: string;
    siteAvis: string;
  };
}
