import { Box } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Layout } from "../Layout";
import { LongFormText } from "../LongFormText";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { StillList, StillListHeading, StillListNav } from "../StillList";

export function Article({
  image,
  alt,
  title,
  articleText,
  moreReviewedTitles,
}: {
  image: IGraphqlImage;
  alt: string;
  articleText?: string | null;
  title?: string | null;
  moreReviewedTitles: readonly Queries.StillListMovieFragment[];
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
          <PageTitle
            paddingX="pageMargin"
            paddingY={{ default: 24, desktop: 32 }}
            textAlign="center"
          >
            {title}
          </PageTitle>
          <GraphqlImage image={image} alt={alt} />
          <Spacer axis="vertical" size={64} />
          <Box paddingX="pageMargin">
            <LongFormText maxWidth="prose" text={articleText} />
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
              movies={moreReviewedTitles}
              seeAllLinkTarget="/reviews/"
              seeAllLinkText="Reviews"
            />
          </StillListNav>
        </Box>
      </main>
    </Layout>
  );
}
