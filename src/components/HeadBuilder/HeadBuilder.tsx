import { useLocation } from "@gatsbyjs/reach-router"; // eslint-disable-line import/no-extraneous-dependencies
import { graphql, useStaticQuery } from "gatsby";

export interface QueryResult {
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

export function HeadBuilder({
  pageTitle,
  description,
  image = null,
  article = false,
}: {
  pageTitle: string;
  description: string;
  image?: string | null;
  article?: boolean;
}): JSX.Element {
  const { pathname } = useLocation();
  const data: QueryResult = useStaticQuery(graphql`
    query {
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

  const meta = {
    title: buildTitle(pageTitle, siteTitle),
    description,
    image: `${siteUrl}${image || siteImage}`,
    url: `${siteUrl}${pathname}`,
  };
  return (
    <>
      <title>{buildTitle(pageTitle, siteTitle)}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content={meta.description} />
      <meta name="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      {article && <meta property="og:type" content="article" />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={meta.description} />
    </>
  );
}
