function HeadBuilder({
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
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {image && <meta name="og:image" content={image} />}
      {article && <meta property="og:type" content="article" />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
    </>
  );
}

export default HeadBuilder;
