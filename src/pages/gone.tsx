import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import ArticlePage from "../components/ArticlePage";
import HeadBuilder from "../components/HeadBuilder";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="410: Gone"
      description="Forget it, Jake. It's Chinatown."
      image={null}
      article
    />
  );
}

export default function GonePage({ data }: PageQueryResult): JSX.Element {
  const { backdrop, page } = data;

  return (
    <ArticlePage
      image={backdrop.childImageSharp.gatsbyImageData}
      alt="Jake Gittes walks away."
      articleText={page.html}
      title={page.frontmatter.title}
    />
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
