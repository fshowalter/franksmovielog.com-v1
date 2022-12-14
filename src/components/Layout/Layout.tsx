/* eslint-env browser, node */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import "../../styles/global.css";
import { Box } from "../Box";
import { Footer } from "../Footer";
import { Mast } from "../Mast";
import {
  bandStickyStyle,
  headerLayoutStyle,
  pageCanvasStyle,
} from "./Layout.css";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Box as="a" href="#content" screenReaderOnly={true}>
        Skip to content
      </Box>
      <Box
        backgroundImage="ripNotComingSoon"
        minHeight={16}
        width="full"
        className={bandStickyStyle}
      />

      <Box
        backgroundColor="default"
        className={pageCanvasStyle}
        display="flex"
        flexDirection="column"
      >
        <Mast
          rowGap={24}
          paddingX="gutter"
          paddingY={{ default: 24, desktop: 32 }}
          alignItems="center"
          boxShadow="borderBottom"
          backgroundColor="default"
          className={headerLayoutStyle}
        />
        <Box flexGrow={1}>{children}</Box>
        <Footer
          paddingX="gutter"
          paddingY={32}
          rowGap={24}
          alignItems="center"
          flexDirection="column"
        />
      </Box>
    </>
  );
}
