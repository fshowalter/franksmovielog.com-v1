import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Layout from "../Layout";
import RenderedMarkdown from "../RenderedMarkdown";
import { articleCss, bodyCss, imageCss } from "./ArticlePage.module.scss";

export default function ArticlePage({
  image,
  alt,
  articleText,
}: {
  image: IGatsbyImageData;
  alt: string;
  articleText: string;
}): JSX.Element {
  return (
    <Layout>
      <main>
        <article className={articleCss}>
          <GatsbyImage
            image={image}
            alt={alt}
            className={imageCss}
            loading="eager"
          />
          <RenderedMarkdown className={bodyCss} text={articleText} />
        </article>
      </main>
    </Layout>
  );
}
