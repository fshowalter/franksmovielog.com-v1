import { graphql } from "gatsby";
import { ArticlePage } from "../components/ArticlePage";
import { HeadBuilder } from "../components/HeadBuilder";

export function Head(): JSX.Element {
  return (
    <HeadBuilder
      pageTitle="How I Grade"
      description="The criteria I use to rate movies on this site."
      image={null}
      article
    />
  );
}

export default function HowIGradePage({
  data,
}: {
  data: Queries.HowIGradePageQuery;
}): JSX.Element {
  const { still, page } = data;

  return (
    <ArticlePage
      image={still}
      alt="Empty cinema seats."
      articleText={page?.html}
      title={page?.frontmatter?.title}
    />
  );
}

export const pageQuery = graphql`
  query HowIGradePage {
    still: file(absolutePath: { regex: "/stills/how-i-grade.png$/" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          formats: [JPG, AVIF]
          quality: 80
          width: 1000
          placeholder: BLURRED
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
