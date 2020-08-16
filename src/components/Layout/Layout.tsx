/* eslint-env browser, node */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import SearchIcon from "../SearchIcon";
import * as styles from "./layout.module.scss";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

function MastNavItem({ to, children }: NavItemProps): JSX.Element {
  return (
    <li className={styles.mast_nav_list_item}>
      <Link
        to={to}
        className={styles.mast_nav_link}
        activeClassName={styles.mast_nav_link_active}
      >
        {children}
      </Link>
    </li>
  );
}

function FooterNavItem({ to, children }: NavItemProps): JSX.Element {
  return (
    <li className={styles.footer_nav_list_item}>
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
      <a className={styles.skip_link} href="#content">
        Skip to content
      </a>
      <div className={styles.outer}>
        <div id="top" className={styles.container}>
          <Helmet>
            <html lang="en-us" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Helmet>

          <div className={styles.sticky_wrap}>
            <header className={styles.mast_header}>
              <div className={styles.mast_logo}>
                <h1 className={styles.mast_title}>
                  <Link to="/">Frank&apos;s Movie Log</Link>
                </h1>
                <p className={styles.mast_tagline}>My life at the movies.</p>
              </div>
              <form
                action="https://www.google.com/search"
                acceptCharset="UTF-8"
                method="get"
                role="search"
                className={styles.mast_search_form}
              >
                <label htmlFor="search" className={styles.mast_search_wrap}>
                  <span className={styles.mast_search_label}>Search</span>
                  <input
                    type="text"
                    className={styles.mast_search_input}
                    name="q"
                    id="search"
                    placeholder="Search..."
                  />
                  <input
                    type="hidden"
                    name="q"
                    value="site:movielog.frankshowalter.com"
                  />
                  <button
                    type="submit"
                    className={styles.mast_search_submit}
                    value="Search"
                    aria-label="Search"
                  >
                    <SearchIcon />
                  </button>
                </label>
              </form>
            </header>
            <nav className={styles.mast_nav}>
              <ul className={styles.mast_nav_list}>
                <MastNavItem to="/">Home</MastNavItem>
                <MastNavItem to="/about/">About</MastNavItem>
                <MastNavItem to="/how-i-grade/">How I Grade</MastNavItem>
                <MastNavItem to="/reviews/">All Reviews</MastNavItem>
                <MastNavItem to="/viewings/">Viewing Log</MastNavItem>
                <MastNavItem to="/watchlist/">Watchlist</MastNavItem>
              </ul>
            </nav>
          </div>
          <div id="content" className={styles.children}>
            {children}
          </div>
        </div>
        <footer className={styles.footer}>
          <ul className={styles.footer_nav_list}>
            <FooterNavItem to="/">Home</FooterNavItem>
            <FooterNavItem to="/about/">About</FooterNavItem>
            <FooterNavItem to="/how-i-grade/">How I Grade</FooterNavItem>
            <FooterNavItem to="/reviews/">All Reviews</FooterNavItem>
            <FooterNavItem to="/viewings/">Viewing Log</FooterNavItem>
            <FooterNavItem to="/watchlist/">Watchlist</FooterNavItem>
          </ul>
          <p className={styles.footer_fair_use}>
            All stills used in accordance with the{" "}
            <a href="http://www.copyright.gov/title17/92chap1.html#107">
              Fair Use Law.
            </a>
          </p>
          <a href="#top" className={styles.footer_to_the_top}>
            To the top ↑
          </a>
        </footer>
      </div>
    </>
  );
}
