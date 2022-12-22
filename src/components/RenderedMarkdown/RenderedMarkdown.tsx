import { composeClassNames } from "../../styles/composeClassNames";
import { Box, IBoxProps } from "../Box";
import { renderedMarkdownStyle } from "./RenderedMarkdown.css";

interface IRenderedMarkdownProps extends IBoxProps {
  text?: string | null;
}

export function RenderedMarkdown({
  className,
  text,
  ...rest
}: IRenderedMarkdownProps): JSX.Element | null {
  if (!text) {
    return null;
  }

  return (
    <Box
      fontWeight="light"
      className={composeClassNames(renderedMarkdownStyle, className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
      {...rest}
    />
  );
}
