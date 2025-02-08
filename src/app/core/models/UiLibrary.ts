import {LinkInfo} from './LinkInfo';

export interface UiLibrary extends LinkInfo {
  advantages: string;
  disadvantages: string;
  features: string;
  useCases: string;
  sources: string[];
}
