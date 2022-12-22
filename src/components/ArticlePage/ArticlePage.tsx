import { Box } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Layout } from "../Layout";
import { PageTitle } from "../PageTitle";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { Spacer } from "../Spacer";
import { StillList, StillListHeading, StillListNav } from "../StillList";

export function ArticlePage({
  image,
  alt,
  title,
  articleText,
  moreReviews,
}: {
  image: IGraphqlImage;
  alt: string;
  articleText?: string | null;
  title?: string | null;
  moreReviews: Queries.StillListMovieFragment[];
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
          <PageTitle paddingX="pageMargin">{title}</PageTitle>
          <GraphqlImage image={image} alt={alt} />
          <Spacer axis="vertical" size={64} />
          <Box paddingX="pageMargin">
            <RenderedMarkdown maxWidth="prose" text={articleText} />
          </Box>
          <Spacer axis="vertical" size={128} />
        </Box>
        <Box
          maxWidth={{ default: "popout", tablet: "full" }}
          width="full"
          display="flex"
          alignItems="center"
          backgroundColor={{ default: "default", tablet: "subtle" }}
          paddingTop={{ default: 0, tablet: 32 }}
          paddingBottom={{ default: 0, tablet: 128 }}
          justifyContent="center"
        >
          <StillListNav>
            <StillListHeading
              leadText="Latest"
              linkText="Reviews"
              linkTarget={`/reviews/`}
            />
            <StillList
              movies={moreReviews}
              seeAllLinkTarget="/reviews/"
              seeAllLinkText="Reviews"
            />
          </StillListNav>
        </Box>
      </main>
    </Layout>
  );
}
