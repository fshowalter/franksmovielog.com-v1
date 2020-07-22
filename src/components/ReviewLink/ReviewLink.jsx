import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import PropTypes from "prop-types";

function reviewForImdbId(reviews, imdbId) {
  return reviews.find((review) => review.frontmatter.imdb_id === imdbId);
}

export default function ReviewLink({ imdbId, children, className }) {
  const reviews = useStaticQuery(graphql`
    query ReviewLinkQuery {
      allMarkdownRemark(filter: { postType: { eq: "review" } }) {
        nodes {
          frontmatter {
            imdb_id
            slug
          }
        }
      }
    }
  `).allMarkdownRemark.nodes;

  const review = reviewForImdbId(reviews, imdbId);

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
