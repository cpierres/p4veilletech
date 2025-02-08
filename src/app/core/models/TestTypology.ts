import {LinkInfo} from './LinkInfo';

export interface TestTypology {
  typeTest: string;
  description: string;
  frontendTools: LinkInfo[];
  backendTools: LinkInfo[];
  angularExample: string;
  springExample: string;
}
