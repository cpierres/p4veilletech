import {ToolInfo} from './ToolInfo';

export interface TestLibraryUi extends ToolInfo {
  typeDeTest: string;
  caracteristiques: string[];
  pointsForts: string[];
  pointsFaibles: string[];
  references: {
    github: string;
    siteAvis: string;
  };
}
