import {LinkInfo} from './LinkInfo';

export interface TestLibraryUi extends LinkInfo {
  typeDeTest: string;
  caracteristiques: string[];
  pointsForts: string[];
  pointsFaibles: string[];
  references: {
    github: string;
    siteAvis: string;
  };
}
