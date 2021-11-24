import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import ArticlePage from "../components/ArticlePage";
import Seo from "../components/Seo";

export default function HowIGradePage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <>
      <Seo
        pageTitle="How I Grade"
        description="The criteria I use to rate movies on this site."
        image={null}
        article
      />
      <ArticlePage
        image={backdrop.childImageSharp.gatsbyImageData}
        alt="Empty cinema seats."
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
    backdrop: file(absolutePath: { regex: "/backdrops/how-i-grade.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 1000
          placeholder: TRACED_SVG
          breakpoints: [414, 640, 818, 904, 1000, 1280, 1808, 2000]
          sizes: "(max-width: 414px) 414px, (max-width: 1023px) 640px, (max-width: 1279px) 1000px, 904px"
        )
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: "how-i-grade" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
