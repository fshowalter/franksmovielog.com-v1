import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/Layout";

export default function HowIGradePage({ data }: PageQueryResult): JSX.Element {
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

HowIGradePage.propTypes = {
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

type PageQueryResult = {
  data: {
    page: {
      nodes: [
        {
          backdrop: {
            childImageSharp: {
              fluid: FluidObject;
            };
          };
          html: string;
        }
      ];
    };
  };
};

export const pageQuery = graphql`
  query {
    page: allMarkdownRemark(
      filter: { frontmatter: { slug: { eq: "how-i-grade" } } }
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
