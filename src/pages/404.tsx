import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import styles from "./404.module.scss";

export default function NotFoundPage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <Layout>
      <Seo
        pageTitle="404: Not Found"
        description="Dick Laurent is dead."
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
    backdrop: file(absolutePath: { regex: "/backdrops/not-found.png$/" }) {
      childImageSharp {
        fluid(toFormat: JPG, maxWidth: 1000, quality: 80) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "not-found" } }) {
      html
    }
  }
`;
