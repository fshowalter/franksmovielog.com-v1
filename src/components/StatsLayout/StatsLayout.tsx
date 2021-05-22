import React, { ReactNode } from "react";
import {
  containerCss,
  contentCss,
  headerCss,
  headingCss,
  taglineCss,
} from "./StatsLayout.module.scss";

export function StatsLayoutHeader({
  headingText,
  children,
}: {
  headingText: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <header className={headerCss}>
      <h2 className={headingCss}>{headingText}</h2>
      <p className={taglineCss}>{children}</p>
    </header>
  );
}

export function StatsLayoutContent({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  return <div className={contentCss}>{children}</div>;
}

export function StatsLayout({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  return <main className={containerCss}>{children}</main>;
}
