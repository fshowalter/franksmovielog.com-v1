import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import ArticlePage from "../components/ArticlePage";
import HeadBuilder from "../components/HeadBuilder";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="About"
      description="I have come here to chew bubblegum and kick ass. And I'm all out of bubblegum."
      image={null}
      article
    />
  );
}

export default function AboutPage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <ArticlePage
      image={backdrop.childImageSharp.gatsbyImageData}
      alt="A coffee cup with the word BEGIN on it."
      articleText={page.html}
      title={page.frontmatter.title}
    />
  );
}

interface PageQueryResult {
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
}

export const pageQuery = graphql`
  query {
    backdrop: file(absolutePath: { regex: "/backdrops/about.png$/" }) {
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
    page: markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
