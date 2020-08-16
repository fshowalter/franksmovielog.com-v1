import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import * as styles from "./how-i-grade.module.scss";

export default function HowIGradePage({ data }: PageQueryResult): JSX.Element {
  const page = data.page.nodes[0];

  return (
    <Layout>
      <main className={styles.container}>
        <article>
          <div className="home-post_image_wrap">
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
      filter: { frontmatter: { slug: { eq: "how-i-grade" } } }
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
