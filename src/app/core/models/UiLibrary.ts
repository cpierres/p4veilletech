import {ToolInfo} from './ToolInfo';

export interface UiLibrary extends ToolInfo {
  advantages: string;
  disadvantages: string;
  features: string;
  useCases: string;
  sources: string[];
}
