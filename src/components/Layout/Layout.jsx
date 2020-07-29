/* eslint-env browser, node */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useReducer, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import "../../styles/js.scss";
import styles from "./layout.module.scss";
import SearchIcon from "../SearchIcon";

function initState() {
  return {
    navVisible: false,
    searchVisible: false,
  };
}

const actions = {
  TOGGLE_NAV: "TOGGLE_NAV",
  TOGGLE_SEARCH: "TOGGLE_SEARCH",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.TOGGLE_NAV: {
      return {
        ...state,
        navVisible: !state.navVisible,
      };
    }
    case actions.TOGGLE_SEARCH: {
      return {
        ...state,
        searchVisible: !state.searchVisible,
      };
    }
    default:
      throw new Error();
  }
}

function MastNavItem({ to, children }) {
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

MastNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function FooterNavItem({ to, children }) {
  return (
    <li className={styles.footer_nav_list_item}>
      <Link to={to} className={styles.footer_nav_link}>
        {children}
      </Link>
    </li>
  );
}

FooterNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function getWidth(element) {
  return parseFloat(getComputedStyle(element, null).width.replace("px", ""));
}

function getVisibleLinks(element) {
  return element.querySelectorAll("li:not(.js_hidden)");
}

function getHiddenLinks(element) {
  return element.querySelectorAll("li.js_hidden");
}

function updateNavBar({
  navBarEl,
  navListEl,
  navButtonEl,
  searchButtonEl,
  responsiveBreaks,
}) {
  const availableSpace = Math.ceil(
    document.documentElement.clientWidth - navButtonEl.clientWidth
  );

  if (getWidth(navListEl) > availableSpace) {
    // Logic when visible list is overflowing the nav

    responsiveBreaks.push(getWidth(navListEl)); // Record the width of the list

    const visibleLinks = getVisibleLinks(navListEl);

    visibleLinks[visibleLinks.length - 1].classList.add("js_hidden");

    // Show the responsive hidden button
    if (navButtonEl.classList.contains("js_hidden")) {
      navButtonEl.classList.remove("js_hidden");
    }
  } else {
    // Logic when visible list is not overflowing the nav
    if (availableSpace > responsiveBreaks[responsiveBreaks.length - 1]) {
      // Logic when there is space for another item in the nav
      const hiddenLinks = getHiddenLinks(navListEl);
      hiddenLinks[0].classList.remove("js_hidden");

      responsiveBreaks.pop(); // Move the item to the visible list
    }

    // Hide the resonsive hidden button if list is empty
    if (responsiveBreaks.length < 1 && getHiddenLinks(navListEl).length === 0) {
      navButtonEl.classList.add("js_hidden");
    }
  }

  if (
    getWidth(navListEl) > availableSpace ||
    responsiveBreaks[responsiveBreaks.length - 1] < availableSpace
  ) {
    // Occur again if the visible list is still overflowing the nav
    updateNavBar({
      navBarEl,
      navListEl,
      navButtonEl,
      searchButtonEl,
      responsiveBreaks,
    });
  }
}

function debounce(fn, ms, ...args) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
}

function MenuIcon() {
  return (
    <svg
      className={styles.mast_nav_menu_icon}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <rect x="0" y="0" width="100%" height="2" />
      <rect x="0" y="7" width="100%" height="2" />
      <rect x="0" y="14" width="100%" height="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22.88 22.88"
      width="1em"
      height="1em"
      fill="currentColor"
      className={styles.mast_nav_menu_close_icon}
    >
      <path d="M.324 1.909a1.14 1.14 0 010-1.587 1.14 1.14 0 011.587 0l9.523 9.539L20.973.322a1.12 1.12 0 011.571 0 1.112 1.112 0 010 1.587l-9.523 9.524 9.523 9.539a1.112 1.112 0 010 1.587 1.12 1.12 0 01-1.571 0l-9.539-9.539-9.523 9.539a1.14 1.14 0 01-1.587 0c-.429-.444-.429-1.159 0-1.587l9.523-9.539L.324 1.909z" />
    </svg>
  );
}

function Layout({ children }) {
  const [state, dispatch] = useReducer(reducer, {}, initState);
  const navBarEl = useRef(null);
  const navButtonEl = useRef(null);
  const navListEl = useRef(null);
  const searchButtonEl = useRef(null);
  const responsiveBreaks = useRef([]);

  // useLayoutEffect(() => {
  //   if (state.navVisible) {
  //     return () => {};
  //   }

  //   const debouncedHandleResize = debounce(function handleResize() {
  //     updateNavBar({
  //       navBarEl: navBarEl.current,
  //       navButtonEl: navButtonEl.current,
  //       navListEl: navListEl.current,
  //       responsiveBreaks: responsiveBreaks.current,
  //       searchButtonEl: searchButtonEl.current,
  //     });
  //   }, 50);

  //   window.addEventListener("resize", debouncedHandleResize);

  //   debouncedHandleResize();

  //   return () => {
  //     window.removeEventListener("resize", debouncedHandleResize);
  //   };
  // });

  return (
    <div className={styles.outer}>
      <a className={styles.skip_link} href="#content">
        Skip to content
      </a>
      <div
        id="top"
        className={`${styles.container} ${
          state.navVisible ? styles.mast_nav_visible : ""
        } ${state.searchVisible ? styles.mast_nav_search_visible : ""}`}
      >
        <Helmet>
          <html lang="en-us" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1"
          />
        </Helmet>

        <header className={styles.mast_header}>
          <div className={styles.mast_logo}>
            <h1 className={styles.mast_title}>
              <Link href="/">Frank&apos;s Movie Log</Link>
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
              >
                <SearchIcon />
              </button>
            </label>
          </form>
        </header>
        <nav ref={navBarEl} className={styles.mast_nav}>
          {/* <h2 className={styles.mast_nav_heading}>Navigation</h2> */}
          <ul ref={navListEl} className={styles.mast_nav_list}>
            <MastNavItem to="/">Home</MastNavItem>
            <MastNavItem to="/about/">About</MastNavItem>
            <MastNavItem to="/how-i-grade/">How I Grade</MastNavItem>
            <MastNavItem to="/reviews/">All Reviews</MastNavItem>
            <MastNavItem to="/viewings/">Viewing Log</MastNavItem>
            <MastNavItem to="/watchlist/">Watchlist</MastNavItem>
          </ul>
          {/* <button
          type="button"
          ref={navButtonEl}
          className={styles.mast_nav_menu_button}
          aria-label="Toggle Full Navigation"
          onClick={() => dispatch({ type: actions.TOGGLE_NAV })}
        >
          {state.navVisible ? <CloseIcon /> : <MenuIcon />}
        </button> */}
        </nav>
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
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
