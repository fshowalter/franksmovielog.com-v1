declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "@gatsbyjs/reach-router" {
  export interface HLocation<S = unknown> {
    pathname: string;
    search: string;
    state: S;
    hash: string;
    key?: string;
  }
  export type WindowLocation<S = unknown> = Window["location"] & HLocation<S>;

  export type HistoryActionType = "PUSH" | "POP";
  export type HistoryLocation = WindowLocation & { state?: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
  export interface HistoryListenerParameter {
    location: HistoryLocation;
    action: HistoryActionType;
  }
  export type HistoryListener = (parameter: HistoryListenerParameter) => void;
  export type HistoryUnsubscribe = () => void;

  export interface History {
    readonly location: HistoryLocation;
    readonly transitioning: boolean;
    listen: (listener: HistoryListener) => HistoryUnsubscribe;
    navigate: NavigateFn;
  }

  export interface LocationProviderProps {
    history?: History;
    children?: React.ReactNode | LocationProviderRenderFn;
  }

  export class LocationProvider extends React.Component<LocationProviderProps> {} // eslint-disable-line react/prefer-stateless-function

  export interface HistorySource {
    readonly location: WindowLocation;
    addEventListener(name: string, listener: (event: Event) => void): void;
    removeEventListener(name: string, listener: (event: Event) => void): void;
    history: {
      readonly state: any; // eslint-disable-line @typescript-eslint/no-explicit-any
      pushState(state: any, title: string, uri: string): void; // eslint-disable-line @typescript-eslint/no-explicit-any
      replaceState(state: any, title: string, uri: string): void; // eslint-disable-line @typescript-eslint/no-explicit-any
    };
  }

  export function createHistory(source: HistorySource): History;

  export function createMemorySource(initialPath: string): HistorySource;

  export function useLocation(): WindowLocation;
}
