import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import styles from "./about.module.scss";

export default function AboutPage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <Layout>
      <Seo
        pageTitle="About this site"
        description="An attempt to justify this site's existence."
        image={null}
        article
      />
      <main>
        <article className={styles.article}>
          <Img
            fluid={backdrop.childImageSharp.fluid}
            alt=""
            className={styles.image}
            loading="eager"
            fadeIn={false}
          />
          <RenderedMarkdown className={styles.body} text={page.html} />
        </article>
      </main>
    </Layout>
  );
}

type PageQueryResult = {
  data: {
    backdrop: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    page: {
      html: string;
    };
  };
};

export const pageQuery = graphql`
  query {
    backdrop: file(absolutePath: { regex: "/backdrops/about.png$/" }) {
      childImageSharp {
        fluid(toFormat: JPG, maxWidth: 1000, quality: 80) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
    }
  }
`;
