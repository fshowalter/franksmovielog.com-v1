import { IBoxProps } from "../Box";
import { RenderedMarkdown } from "../RenderedMarkdown";
import { typographyStyle } from "./LongFormText.css";

interface ILongFormTextProps extends IBoxProps {
  text?: string | null;
}

export function LongFormText({ text, ...rest }: ILongFormTextProps) {
  return <RenderedMarkdown text={text} className={typographyStyle} {...rest} />;
}
