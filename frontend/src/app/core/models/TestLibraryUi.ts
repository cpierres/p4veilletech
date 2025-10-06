import { GithubInfo } from './GithubInfo';
import {LinkInfo} from './LinkInfo';

export interface TestLibraryUi extends LinkInfo {
  typeDeTest: string;
  caracteristiques: string[];
  pointsForts: string[];
  pointsFaibles: string[];
  references: {
    github: GithubInfo;
    siteAvis: LinkInfo[];
  };
}
