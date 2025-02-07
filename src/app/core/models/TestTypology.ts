import {ToolInfo} from './ToolInfo';

export interface TestTypology {
  typeTest: string;
  description: string;
  frontendTools: ToolInfo[];
  backendTools: ToolInfo[];
  angularExample: string;
  springExample: string;
}
