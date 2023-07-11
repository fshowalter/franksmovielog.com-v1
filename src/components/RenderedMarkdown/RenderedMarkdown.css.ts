import { globalStyle, style } from "@vanilla-extract/css";
import { borderColors, foregroundColors } from "../../styles/colors.css";

export const renderedMarkdownStyle = style({});

globalStyle(`${renderedMarkdownStyle} a`, {
  color: foregroundColors.accent,
});

globalStyle(`${renderedMarkdownStyle}  p`, {
  marginBottom: "24px",
});

globalStyle(`${renderedMarkdownStyle} blockquote`, {
  borderLeft: `0.5rem solid ${borderColors.default}`,
  color: foregroundColors.muted,
  fontStyle: "italic",
  margin: "24px 0",
  padding: "0 24px",
  position: "relative",
  quotes: `"\\201C""\\201D""\\2018""\\2019"`,
});

globalStyle(
  `${renderedMarkdownStyle} h1, ${renderedMarkdownStyle} h2, ${renderedMarkdownStyle} h3`,
  {
    lineHeight: "1.1",
    marginTop: "1.5rem",
  },
);

globalStyle(`${renderedMarkdownStyle} h2`, {
  fontSize: "24px",
  lineHeight: "24px",
  marginBottom: "8px",
});

globalStyle(`${renderedMarkdownStyle}  h3`, {
  fontSize: "20px",
  marginBottom: "0.25rem",
});

globalStyle(`${renderedMarkdownStyle} hr`, {
  border: `1px solid ${borderColors.default}`,
  margin: "39px auto 39px",
  width: "75%",
});

globalStyle(`${renderedMarkdownStyle}  img`, {
  height: "1rem",
  width: "auto",
});

globalStyle(`${renderedMarkdownStyle} p:last-child`, { marginBottom: 0 });

globalStyle(`${renderedMarkdownStyle} ol`, {
  listStyleType: "decimal",
  paddingLeft: "1.4rem",
});

globalStyle(`${renderedMarkdownStyle}  ul`, {
  listStyleType: "none",
  paddingLeft: "1.4rem",
});

globalStyle(`${renderedMarkdownStyle}  li`, {
  lineHeight: "28px",
  marginBottom: "1.4rem",
});
