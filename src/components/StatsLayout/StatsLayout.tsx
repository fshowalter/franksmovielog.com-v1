import React from "react";
import Layout from "../Layout";
import {
  containerCss,
  contentCss,
  headerCss,
  headingCss,
  taglineCss,
} from "./StatsLayout.module.scss";

export default function StatsLayout({
  heading,
  subHeading,
  children,
}: {
  heading: string;
  subHeading: React.ReactNode;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Layout>
      <main className={containerCss}>
        <header className={headerCss}>
          <h2 className={headingCss}>{heading}</h2>
          <div className={taglineCss}>{subHeading}</div>
        </header>
        <div className={contentCss}>{children}</div>
      </main>
    </Layout>
  );
}
