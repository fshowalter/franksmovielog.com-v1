import { Box } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Layout } from "../Layout";
import { PageTitle } from "../PageTitle";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { Spacer } from "../Spacer";

export function ArticlePage({
  image,
  alt,
  title,
  articleText,
}: {
  image: IGraphqlImage;
  alt: string;
  articleText?: string | null;
  title?: string | null;
}): JSX.Element {
  return (
    <Layout>
      <main>
        <Box
          as="article"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <PageTitle paddingX="gutter">{title}</PageTitle>
          <GraphqlImage image={image} alt={alt} />
          <Spacer axis="vertical" size={64} />
          <RenderedMarkdown
            paddingX="gutter"
            maxWidth="proseWithGutters"
            text={articleText}
          />
          <Spacer axis="vertical" size={128} />
        </Box>
      </main>
    </Layout>
  );
}
