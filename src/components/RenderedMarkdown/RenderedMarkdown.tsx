import { composeClassNames } from "../../utils/composeClassNames";
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
      letterSpacing={0.3}
      fontSize="prose"
      className={composeClassNames(renderedMarkdownStyle, className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
      {...rest}
    />
  );
}
