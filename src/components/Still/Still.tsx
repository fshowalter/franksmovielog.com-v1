import { GraphqlImage, IGraphqlImageProps } from "../GraphqlImage";

interface IStillProps extends Omit<IGraphqlImageProps, "alt"> {
  title: string;
  year: string | number;
}

export function Still({ title, year, ...rest }: IStillProps): JSX.Element {
  return <GraphqlImage {...rest} alt={`A still from ${title} (${year})`} />;
}
