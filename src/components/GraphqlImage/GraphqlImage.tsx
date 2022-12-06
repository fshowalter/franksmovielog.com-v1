import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Box, IBoxProps } from "../Box";

export interface IGraphqlImageProps extends IBoxProps {
  image: IGraphqlImage;
  className?: string;
  alt: string;
  loading?: "lazy" | "eager";
}

export type IGraphqlImage = {
  readonly childImageSharp: {
    readonly gatsbyImageData: IGatsbyImageData;
  } | null;
} | null;

export function GraphqlImage({
  image,
  className,
  ...rest
}: IGraphqlImageProps): JSX.Element {
  const gatsbyImageData = image?.childImageSharp?.gatsbyImageData;

  if (!gatsbyImageData) {
    return <Box className={className} {...rest} />;
  }

  const newProps = { image: gatsbyImageData, ...rest };

  return <Box as={GatsbyImage} className={className} {...newProps} />;
}
