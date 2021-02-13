import Img, { FixedObject } from "gatsby-image";
import React from "react";
import styles from "./FilterPageHeader.module.scss";

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
        <div className={styles.avatar}>
          <Img fixed={avatar} alt={alt} fadeIn={false} loading="eager" />
        </div>
      )}
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.tagline}>{tagline}</p>
    </header>
  );
}

FilterPageHeader.defaultProps = {
  avatar: null,
  alt: null,
};
