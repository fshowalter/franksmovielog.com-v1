import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import * as styles from "./about.module.scss";

export default function AboutPage({ data }: PageQueryResult): JSX.Element {
  const page = data.page.nodes[0];

  return (
    <Layout>
      <main className={styles.container}>
        <article>
          <div>
            <Img fluid={page.backdrop.childImageSharp.fluid} alt="" />
          </div>
          <div
            className={styles.body}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: page.html,
            }}
          />
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
      filter: { frontmatter: { slug: { eq: "about" } } }
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
