import type { IGraphqlImage } from "../GraphqlImage";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { ReviewSubHeading } from "../ReviewSubHeading";
import { avatarStyle } from "./RelatedMoviesListHeading.css";

export function RelatedMoviesListHeading({
  leadText,
  linkText,
  linkTarget,
  avatar,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  avatar?: IGraphqlImage;
}) {
  return (
    <ReviewSubHeading
      boxShadow={{ default: "borderBottom", tablet: "unset" }}
      display="flex"
      justifyContent={{ default: "center", desktop: "flex-start" }}
      paddingY={{ default: 8, desktop: 16 }}
      paddingX={{ default: "popoutGutter", desktop: "gutter" }}
    >
      {avatar && (
        <GraphqlImage
          image={avatar}
          alt={`More ${linkText} reviews`}
          className={avatarStyle}
        />
      )}
      <span>
        {leadText}{" "}
        <Link
          to={linkTarget}
          color="accent"
          textDecoration="none"
          display="inline-flex"
          columnGap=".5ch"
        >
          {linkText}
        </Link>
      </span>
    </ReviewSubHeading>
  );
}
