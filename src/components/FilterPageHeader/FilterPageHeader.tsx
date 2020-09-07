import Img, { FluidObject } from "gatsby-image";
import React from "react";
import styles from "./FilterPageHeader.module.scss";

export default function FilterPageHeader({
  avatar,
  alt,
  className,
  heading,
  tagline,
}: {
  avatar?: FluidObject;
  alt?: string;
  className: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
}): JSX.Element {
  return (
    <header className={className}>
      {avatar && <Img fluid={avatar} alt={alt} className={styles.avatar} />}
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.tagline}>{tagline}</p>
    </header>
  );
}

FilterPageHeader.defaultProps = {
  avatar: null,
  alt: null,
};
