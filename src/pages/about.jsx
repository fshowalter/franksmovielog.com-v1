import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import PropTypes from "prop-types";

import Layout from "../components/Layout";

export default function AboutPage({ data }) {
  const page = data.page.nodes[0];

  return (
    <Layout>
      <main className="home">
        <article>
          <div className="home-post_image_wrap">
            <Img fluid={page.backdrop.childImageSharp.fluid} alt="" />
          </div>
          <div
            className="home-post_excerpt"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: page.html,
            }}
          />
        </article>
      </main>
    </Layout>
  );
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
          }).isRequired,
          backdrop: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.shape({
                src: PropTypes.string.isRequired,
              }),
            }),
          }).isRequired,
          html: PropTypes.string.isRequired,
        }).isRequired
      ),
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query {
    page: allMarkdownRemark(
      filter: { frontmatter: { slug: { eq: "about" } } }
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
        backdrop {
          childImageSharp {
            fluid(toFormat: JPG, jpegQuality: 85) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        html
      }
    }
  }
`;
