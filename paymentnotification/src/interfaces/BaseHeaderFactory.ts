import { ReactNode } from "react";

export interface BaseHeaderFactory {
  createContainer(): ReactNode;
  createLogo(): ReactNode;
  createActions(): ReactNode;
}
