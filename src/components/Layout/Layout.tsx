/* eslint-env browser, node */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { composeClassNames } from "../../styles/composeClassNames";
import "../../styles/global.css";
import { Box } from "../Box";
import { Footer } from "./Footer";
import {
  bandStickyStyle,
  headerLayoutStyle,
  pageCanvasStyle,
  skipToMainContentStyle,
} from "./Layout.css";
import { Mast } from "./Mast";
import { ripNotComingSoonBackgroundImageStyle } from "./backgroundImage.css";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Box
        as="a"
        className={skipToMainContentStyle}
        href="#content"
        paddingX={24}
        paddingY={8}
        backgroundColor="subtle"
        color="accent"
        textAlign="center"
      >
        Skip to content
      </Box>
      <Box
        minHeight={16}
        width="full"
        className={composeClassNames(
          bandStickyStyle,
          ripNotComingSoonBackgroundImageStyle,
        )}
      />

      <Box
        backgroundColor="default"
        className={pageCanvasStyle}
        display="flex"
        flexDirection="column"
      >
        <Mast
          rowGap={24}
          paddingX="pageMargin"
          paddingY={{ default: 24, desktop: 32 }}
          alignItems="center"
          boxShadow="borderBottom"
          backgroundColor="default"
          columnGap={24}
          className={headerLayoutStyle}
        />
        <Box flexGrow={1} id="content">
          {children}
        </Box>
        <Footer
          paddingX="pageMargin"
          paddingY={32}
          rowGap={24}
          alignItems="center"
          flexDirection="column"
          className={ripNotComingSoonBackgroundImageStyle}
        />
      </Box>
    </>
  );
}
