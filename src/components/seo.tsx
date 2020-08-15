import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

type SEOQuery = {
  site: {
    siteMetadata: {
      defaultTitle?: string;
      titleTemplate?: string;
      defaultDescription?: string;
      siteUrl: string;
      defaultImage: string;
    };
  };
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage
      }
    }
  }
`;

function SEO({
  title,
  description,
  image,
  article = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}): JSX.Element {
  const { pathname } = useLocation();
  const data: SEOQuery = useStaticQuery(query);
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = data.site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };
  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      {/* <meta name="image" content={seo.image} /> */}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
    </Helmet>
  );
}
export default SEO;

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
