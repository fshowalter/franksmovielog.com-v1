import { graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layout";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import { articleCss, bodyCss, imageCss } from "./gone.module.scss";

export default function GonePage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <Layout>
      <Seo
        pageTitle="403: Gone"
        description="Forget it, Jake. It's Chinatown."
        image={null}
        article
      />
      <main>
        <article className={articleCss}>
          <GatsbyImage
            image={backdrop.childImageSharp.gatsbyImageData}
            alt="Jake Gittes walks away."
            className={imageCss}
            loading="eager"
          />
          <RenderedMarkdown className={bodyCss} text={page.html} />
        </article>
      </main>
    </Layout>
  );
}

type PageQueryResult = {
  data: {
    backdrop: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    page: {
      html: string;
    };
  };
};

export const pageQuery = graphql`
  query {
    backdrop: file(absolutePath: { regex: "/backdrops/gone.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 1000
          aspectRatio: 1.777777778
          breakpoints: [414, 640, 818, 904, 1000, 1280, 1808, 2000]
          sizes: "(max-width: 414px) 414px, (max-width: 1023px) 640px, (max-width: 1279px) 1000px, 904px"
        )
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "gone" } }) {
      html
    }
  }
`;
