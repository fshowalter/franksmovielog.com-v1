import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import { imageCss } from "./HeroImage.module.scss";

export default function HeroImage({
  className,
  image,
  alt,
}: {
  image: IGatsbyImageData;
  className?: string;
  alt: string;
}): JSX.Element {
  return (
    <GatsbyImage
      className={[imageCss, className].join(" ")}
      image={image}
      alt={alt}
      loading="eager"
    />
  );
}
