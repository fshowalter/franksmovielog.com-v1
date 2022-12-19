import { Box, IBoxProps } from "../Box";
import ScreenReaderOnly from "../ScreenReaderOnly";
import SvgIcon from "../SvgIcon";
import {
  iconStyle,
  searchInputStyle,
  submitButtonStyle,
} from "./SiteSearchForm.css";

export function SiteSearchForm({ ...rest }: IBoxProps) {
  return (
    <Box
      as="form"
      action="https://www.google.com/search"
      acceptCharset="UTF-8"
      method="get"
      role="search"
      boxShadow="borderAll"
      borderRadius={4}
      overflow="hidden"
      width={{ default: "full", desktop: "unset" }}
      maxWidth="prose"
      {...rest}
    >
      <Box as="label" htmlFor="search" display="flex" overflow="hidden">
        <ScreenReaderOnly>Search</ScreenReaderOnly>
        <Box
          as="input"
          type="text"
          name="q"
          id="search"
          placeholder="Search..."
          backgroundColor="subtle"
          color="default"
          fontSize="normal"
          fontWeight="light"
          lineHeight={24}
          flexGrow={1}
          paddingX={16}
          paddingY={8}
          className={searchInputStyle}
        />
        <input type="hidden" name="q" value="site:www.franksmovielog.com" />
        <Box
          as="button"
          type="submit"
          value="Search"
          aria-label="Search"
          backgroundColor="subtle"
          className={submitButtonStyle}
        >
          <SvgIcon className={iconStyle}>
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
            />
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </SvgIcon>
        </Box>
      </Box>
    </Box>
  );
}
