import React from "react";
import styles from "./RenderedMarkdown.module.scss";

export default function RenderedMarkdown({
  text,
  className = "",
  tag = "div",
}: {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}): JSX.Element {
  const Tag = tag;

  return (
    <Tag
      className={`${styles.rendered_markdown} ${className}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
}

RenderedMarkdown.defaultProps = {
  className: "",
  tag: "div",
};
