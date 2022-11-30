/* eslint-env browser, node */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link } from "gatsby";
import React from "react";
import "../../styles/global.css";
import ScreenReaderOnly from "../ScreenReaderOnly";
import Header from "./Header";
import { gridAreaHeaderStyle } from "./Layout.css";
import {
  childrenCss,
  containerCss,
  footerCss,
  footerFairUseCss,
  footerNavListCss,
  footerNavListItemCss,
  mastNavLinkActiveCss,
  mastNavLinkCss,
  mastNavListItemCss,
  skipLinkCss,
} from "./Layout.module.scss";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

function MastNavItem({ to, children }: NavItemProps): JSX.Element {
  return (
    <li className={mastNavListItemCss}>
      <Link
        to={to}
        className={mastNavLinkCss}
        activeClassName={mastNavLinkActiveCss}
      >
        {children}
      </Link>
    </li>
  );
}

function FooterNavItem({ to, children }: NavItemProps): JSX.Element {
  return (
    <li className={footerNavListItemCss}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <a className={skipLinkCss} href="#content">
        Skip to content
      </a>
      <div className={containerCss}>
        <Header className={gridAreaHeaderStyle} />
        <div id="content" className={childrenCss}>
          {children}
        </div>
        <footer className={footerCss}>
          <ul className={footerNavListCss}>
            <FooterNavItem to="/">Home</FooterNavItem>
            <FooterNavItem to="/about/">About</FooterNavItem>
            <FooterNavItem to="/how-i-grade/">How I Grade</FooterNavItem>
            <FooterNavItem to="/reviews/">Reviews</FooterNavItem>
            <FooterNavItem to="/stats/">Stats</FooterNavItem>
            <FooterNavItem to="/watchlist/">Watchlist</FooterNavItem>
          </ul>
          <p className={footerFairUseCss}>
            All stills used in accordance with the{" "}
            <a href="http://www.copyright.gov/title17/92chap1.html#107">
              Fair Use Law.
            </a>
          </p>
          <ScreenReaderOnly>
            <a href="#top">To the top ↑</a>
          </ScreenReaderOnly>
        </footer>
      </div>
    </>
  );
}
