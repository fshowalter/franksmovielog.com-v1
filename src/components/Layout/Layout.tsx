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
import { gridAreaComponent, gridComponent } from "../Grid";
import Footer from "./Footer";
import Header from "./Header";
import {
  contentStyle,
  gridAreas,
  gridStyle,
  pageCanvasStyle,
} from "./Layout.css";
import { skipLinkCss } from "./Layout.module.scss";

const Grid = gridComponent(gridStyle);
const GridArea = gridAreaComponent(gridAreas);

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
      <Box backgroundColor="default" className={pageCanvasStyle}>
        <Box backgroundImage="ripNotComingSoon" minHeight={16}></Box>
        <Box
          position="relative"
          className={contentStyle}
          flex={1}
          margin="center"
        >
          <Grid>
            <GridArea name="header">
              <Header alignSelf={{ max: "start" }} />
            </GridArea>
            <GridArea name="children">{children}</GridArea>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
