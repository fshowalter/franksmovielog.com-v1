import { graphql } from "gatsby";
import { ArticlePage } from "../components/ArticlePage";
import { HeadBuilder } from "../components/HeadBuilder";

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

export default function AboutPage({
  data,
}: {
  data: Queries.AboutPageQuery;
}): JSX.Element {
  const { still, page } = data;

  return (
    <ArticlePage
      image={still}
      alt="A coffee cup with the word BEGIN on it."
      articleText={page?.html}
      title={page?.frontmatter?.title}
    />
  );
}

export const pageQuery = graphql`
  query AboutPage {
    still: file(absolutePath: { regex: "/stills/about.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 960
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
