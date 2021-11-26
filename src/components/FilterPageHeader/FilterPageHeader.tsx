import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import PageTitle from "../PageTitle";
import {
  avatarCss,
  breadcrumbCss,
  headingCss,
  taglineCss,
} from "./FilterPageHeader.module.scss";

type HeaderProps = {
  className: string;
  heading: React.ReactNode;
  tagline: React.ReactNode;
};

type WithBreadCrumpProps = {
  breadcrumb: React.ReactNode;
} & HeaderProps;

type WithAvatarProps = {
  avatar: IGatsbyImageData;
  alt: string;
} & WithBreadCrumpProps;

type Props = HeaderProps | WithBreadCrumpProps | WithAvatarProps;

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
      {"breadcrumb" in props && (
        <div className={breadcrumbCss}>{props.breadcrumb}</div>
      )}
      <PageTitle className={headingCss}>{props.heading}</PageTitle>
      <div className={taglineCss}>{props.tagline}</div>
    </header>
  );
}
