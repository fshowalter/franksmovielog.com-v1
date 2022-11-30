import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

export type IGraphqlImage = {
  readonly childImageSharp: {
    readonly gatsbyImageData: IGatsbyImageData;
  } | null;
} | null;

export function GraphqlImage({
  image,
  alt,
  className,
  loading = "lazy",
}: {
  image: IGraphqlImage;
  alt: string;
  className?: string;
  loading: "eager" | "lazy";
}): JSX.Element | null {
  const gatsbyImageData = image?.childImageSharp?.gatsbyImageData;

  if (!gatsbyImageData) {
    return null;
  }

  return (
    <GatsbyImage
      className={className}
      image={gatsbyImageData}
      alt={alt}
      loading={loading}
    />
  );
}
