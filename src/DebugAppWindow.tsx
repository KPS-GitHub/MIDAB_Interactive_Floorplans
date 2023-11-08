import { ConfigurationState } from "OptConfigurator";

export {};
declare global {
  interface Window {
      app: JSX.Element;
      onlyImages: string[];
      optState: ConfigurationState;
  }
}