// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

export interface SeoQueryResult {
  site: {
    siteMetadata: {
      siteTitle: string;
      siteUrl: string;
      siteImage: string;
    };
  };
}

function buildTitle(pageTitle: string, siteTitle: string): string {
  if (pageTitle?.startsWith(siteTitle)) {
    return pageTitle;
  }

  return `${pageTitle} | ${siteTitle}`;
}

function Seo({
  pageTitle,
  description,
  image = null,
  article = false,
}: {
  pageTitle: string;
  description: string;
  image: string | null;
  article: boolean;
}): JSX.Element {
  const { pathname } = useLocation();
  const data: SeoQueryResult = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle: title
          siteUrl
          siteImage: image
        }
      }
    }
  `);
  const { siteTitle, siteUrl, siteImage } = data.site.siteMetadata;

  const seo = {
    title: buildTitle(pageTitle, siteTitle),
    description,
    image: `${siteUrl}${image || siteImage}`,
    url: `${siteUrl}${pathname}`,
  };
  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="og:image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
    </Helmet>
  );
}
export default Seo;
