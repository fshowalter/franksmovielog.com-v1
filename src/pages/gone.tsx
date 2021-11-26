import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import ArticlePage from "../components/ArticlePage";
import Seo from "../components/Seo";

export default function GonePage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <>
      <Seo
        pageTitle="410: Gone"
        description="Forget it, Jake. It's Chinatown."
        image={null}
        article
      />
      <ArticlePage
        image={backdrop.childImageSharp.gatsbyImageData}
        alt="Jake Gittes walks away."
        articleText={page.html}
        title={page.frontmatter.title}
      />
    </>
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
      frontmatter: {
        title: string;
      };
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
          placeholder: TRACED_SVG
        )
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "gone" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
