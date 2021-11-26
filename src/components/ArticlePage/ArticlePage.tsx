import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import HeroImage from "../HeroImage";
import Layout from "../Layout";
import PageTitle from "../PageTitle";
import RenderedMarkdown from "../RenderedMarkdown";
import {
  articleCss,
  bodyCss,
  imageCss,
  titleCss,
} from "./ArticlePage.module.scss";

export default function ArticlePage({
  image,
  alt,
  title,
  articleText,
}: {
  image: IGatsbyImageData;
  alt: string;
  articleText: string;
  title: string;
}): JSX.Element {
  return (
    <Layout>
      <main>
        <article className={articleCss}>
          <PageTitle className={titleCss}>{title}</PageTitle>
          <HeroImage image={image} alt={alt} className={imageCss} />
          <RenderedMarkdown className={bodyCss} text={articleText} />
        </article>
      </main>
    </Layout>
  );
}
