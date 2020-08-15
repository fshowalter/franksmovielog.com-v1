import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import MarkdownReview from "../../types/MarkdownReview";

function reviewForImdbId(reviews: MarkdownReview[], imdbId: string) {
  return reviews.find((review) => review.frontmatter.imdbId === imdbId);
}

type ReviewsQuery = {
  allMarkdownRemark: {
    nodes: MarkdownReview[];
  };
};

export default function ReviewLink({
  imdbId,
  children,
  className,
}: {
  imdbId: string;
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  const data: ReviewsQuery = useStaticQuery(graphql`
    query ReviewLinkQuery {
      allMarkdownRemark(filter: { postType: { eq: "REVIEW" } }) {
        nodes {
          frontmatter {
            imdbId: imdb_id
            slug
          }
        }
      }
    }
  `);

  const review = reviewForImdbId(data.allMarkdownRemark.nodes, imdbId);

  if (!review) {
    return <>{children}</>;
  }

  return (
    <Link className={className} to={`/reviews/${review.frontmatter.slug}/`}>
      {children}
    </Link>
  );
}

ReviewLink.defaultProps = {
  className: null,
};
