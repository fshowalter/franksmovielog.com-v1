import { composeClassNames } from "../../utils/composeClassNames";
import { IBoxProps } from "../Box";
import { GraphqlImage, IGraphqlImage } from "../GraphqlImage";
import { imageCss } from "./HeroImage.module.scss";

interface IHeroImageProps extends IBoxProps {
  image: IGraphqlImage;
  className?: string;
  alt: string;
}

export default function HeroImage({
  className,
  ...rest
}: IHeroImageProps): JSX.Element {
  return (
    <GraphqlImage
      className={composeClassNames(className, imageCss)}
      {...rest}
    />
  );
}
