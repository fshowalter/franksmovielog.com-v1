import { graphql } from "gatsby";
import { IBoxProps } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";

interface IListItemPosterProps extends IBoxProps {
  slug: string | null | undefined;
  image: IGraphqlImage;
  title: string;
  year: string;
}

export function ListItemPoster({
  slug,
  image,
  title,
  year,
  ...rest
}: IListItemPosterProps) {
  const props = {
    overflow: "hidden",
    transform: "safariBorderRadiusFix",
    boxShadow: "borderAll",
    borderRadius: 8,
    maxWidth: 56,
    minWidth: 56,
    ...rest,
  } as const;

  if (slug) {
    return (
      <Link to={`/reviews/${slug}/`} {...props}>
        <GraphqlImage image={image} alt={`A poster from ${title} (${year})`} />
      </Link>
    );
  }

  return <GraphqlImage image={image} alt="An unreviewed title." {...props} />;
}

export const query = graphql`
  fragment ListItemPoster on File {
    childImageSharp {
      gatsbyImageData(
        layout: FIXED
        formats: [JPG, AVIF]
        quality: 80
        width: 56
        placeholder: NONE
      )
    }
  }
`;
