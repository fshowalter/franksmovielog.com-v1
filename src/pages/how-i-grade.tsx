import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import RenderedMarkdown from "../components/RenderedMarkdown";
import Seo from "../components/Seo";
import styles from "./how-i-grade.module.scss";

export default function HowIGradePage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <Layout>
      <Seo
        pageTitle="How I Grade"
        description="The criteria I use to rate movies on this site."
        image={null}
        article
      />
      <main>
        <article className={styles.article}>
          <Img
            fluid={backdrop.childImageSharp.fluid}
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
    backdrop: file(absolutePath: { regex: "/backdrops/how-i-grade.png$/" }) {
      childImageSharp {
        fluid(toFormat: WEBP, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "how-i-grade" } }) {
      html
    }
  }
`;
