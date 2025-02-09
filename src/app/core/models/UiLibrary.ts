import {LinkInfo} from './LinkInfo';
import {GithubInfo} from './GithubInfo';

export interface UiLibrary extends LinkInfo {
  advantages: string;
  disadvantages: string;
  features: string;
  useCases: string;
  references: {
    github: GithubInfo;
    siteAvis: LinkInfo[];
  };
}
