import React from "react";
import { Helmet } from "react-helmet";

function Seo({
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
  return (
    <Helmet title={pageTitle}>
      <meta name="description" content={description} />
      {image && <meta name="og:image" content={image} />}
      {article && <meta property="og:type" content="article" />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
export default Seo;
