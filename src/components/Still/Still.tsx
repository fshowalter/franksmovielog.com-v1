import { graphql } from "gatsby";
import { GraphqlImage, IGraphqlImageProps } from "../GraphqlImage";

interface IStillProps extends Omit<IGraphqlImageProps, "alt"> {
  title: string;
  year: string | number;
}

export function Still({ title, year, ...rest }: IStillProps): JSX.Element {
  return <GraphqlImage {...rest} alt={`A still from ${title} (${year})`} />;
}

export const query = graphql`
  fragment StillSplash on File {
    childImageSharp {
      gatsbyImageData(
        layout: CONSTRAINED
        formats: [JPG, AVIF]
        quality: 80
        width: 960
        placeholder: BLURRED
      )
    }
  }
`;
