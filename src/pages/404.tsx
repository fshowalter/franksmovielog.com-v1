import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import styles from "./404.module.scss";

export default function NotFoundPage({ data }: PageQueryResult): JSX.Element {
  const page = data.page.nodes[0];

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
            fluid={page.backdrop.childImageSharp.fluid}
            alt=""
            className={styles.image}
          />
          <RenderedMarkdown className={styles.body} text={page.html} />
        </article>
      </main>
    </Layout>
  );
}

type PageQueryResult = {
  data: {
    page: {
      nodes: [
        {
          backdrop: {
            childImageSharp: {
              fluid: FluidObject;
            };
          };
          html: string;
        }
      ];
    };
  };
};

export const pageQuery = graphql`
  query {
    page: allMarkdownRemark(
      filter: { frontmatter: { slug: { eq: "not-found" } } }
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, jpegQuality: 85) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        html
      }
    }
  }
`;
