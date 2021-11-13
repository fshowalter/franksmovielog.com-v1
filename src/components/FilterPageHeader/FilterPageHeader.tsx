import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import {
  avatarCss,
  headingCss,
  taglineCss,
} from "./FilterPageHeader.module.scss";

type HeaderProps = {
  className: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
};

type WithAvatarProps = {
  avatar: IGatsbyImageData;
  alt: string;
} & HeaderProps;

type Props = HeaderProps | WithAvatarProps;

export default function FilterPageHeader(props: Props): JSX.Element {
  let avatar;

  if ("avatar" in props) {
    avatar = (
      <GatsbyImage
        className={avatarCss}
        image={props.avatar}
        alt={props.alt}
        loading="eager"
      />
    );
  }

  return (
    <header className={props.className}>
      {avatar}
      <h2 className={headingCss}>{props.heading}</h2>
      <div className={taglineCss}>{props.tagline}</div>
    </header>
  );
}
