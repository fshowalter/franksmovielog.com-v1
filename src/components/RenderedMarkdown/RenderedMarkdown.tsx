import React from "react";
import { renderedMarkdownCss } from "./RenderedMarkdown.module.scss";

export default function RenderedMarkdown({
  text,
  className,
  tag,
}: {
  text: string;
  className: string;
  tag?: keyof JSX.IntrinsicElements;
}): JSX.Element {
  const Tag = tag || "div";

  return (
    <Tag
      className={`${renderedMarkdownCss} ${className}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
}
