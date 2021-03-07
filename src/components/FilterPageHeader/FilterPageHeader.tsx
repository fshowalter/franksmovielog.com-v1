import Img, { FixedObject } from "gatsby-image";
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
  avatar?: FixedObject;
  alt?: string;
  className: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
}): JSX.Element {
  return (
    <header className={className}>
      {avatar && (
        <Img
          className={avatarCss}
          fixed={avatar}
          alt={alt}
          fadeIn={false}
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
