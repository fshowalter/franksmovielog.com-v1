import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

export type IGraphqlImage = {
  readonly childImageSharp: {
    readonly gatsbyImageData: IGatsbyImageData;
  } | null;
} | null;

export function GraphqlImage({
  image,
  alt,
}: {
  image: IGraphqlImage;
  alt: string;
}): JSX.Element | null {
  const gatsbyImageData = image?.childImageSharp?.gatsbyImageData;

  if (!gatsbyImageData) {
    return null;
  }

  return <GatsbyImage image={gatsbyImageData} alt={alt} />;
}
