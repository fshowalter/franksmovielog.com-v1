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
import ScreenReaderOnly from "../ScreenReaderOnly";
import Footer from "./Footer";
import Header from "./Header";
import {
  contentStyle,
  gridAreas,
  gridStyle,
  pageCanvasStyle,
} from "./Layout.css";

const Grid = gridComponent(gridStyle);
const GridArea = gridAreaComponent(gridAreas);

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <ScreenReaderOnly>
        <a href="#content">Skip to content</a>
      </ScreenReaderOnly>
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
