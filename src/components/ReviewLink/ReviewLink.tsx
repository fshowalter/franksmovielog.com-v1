import { graphql, Link, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

type Review = {
  frontmatter: {
    // eslint-disable-next-line camelcase
    imdb_id: string;
    slug: string;
  };
};

function reviewForImdbId(reviews: Review[], imdbId: string) {
  return reviews.find((review) => review.frontmatter.imdb_id === imdbId);
}

type ReviewsQuery = {
  allMarkdownRemark: {
    nodes: Review[];
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
            imdb_id
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

ReviewLink.propTypes = {
  imdbId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ReviewLink.defaultProps = {
  className: null,
};
