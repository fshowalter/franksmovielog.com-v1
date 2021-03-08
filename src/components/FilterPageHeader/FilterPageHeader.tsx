import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import {
  avatarCss,
  headingCss,
  taglineCss,
} from "./FilterPageHeader.module.scss";

export default function FilterPageHeader({
  avatar,
  alt,
  className,
  heading,
  tagline,
}: {
  avatar?: IGatsbyImageData;
  alt?: string;
  className: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
}): JSX.Element {
  return (
    <header className={className}>
      {avatar && (
        <GatsbyImage
          className={avatarCss}
          image={avatar}
          alt={alt || ""}
          loading="eager"
        />
      )}
      <h2 className={headingCss}>{heading}</h2>
      <p className={taglineCss}>{tagline}</p>
    </header>
  );
}

FilterPageHeader.defaultProps = {
  avatar: null,
  alt: null,
};
