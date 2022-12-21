import { navigate } from "gatsby";
import { ChangeEvent } from "react";
import { Box, IBoxProps } from "../Box";
import { Link } from "../Link";
import ScreenReaderOnly from "../ScreenReaderOnly";
import { Spacer } from "../Spacer";

interface IPaginationProps extends IBoxProps {
  currentPage: number;
  perPage: number;
  numberOfItems: number;
  urlRoot: string;
  prevText: string;
  nextText: string;
}

function onSelectPage(e: ChangeEvent<HTMLSelectElement>) {
  e.preventDefault();

  if (e.target.value === "1") {
    return void navigate(`/`);
  }

  void navigate(`/page-${e.target.value}/`);
}

export function Pagination({
  currentPage,
  perPage,
  numberOfItems,
  urlRoot,
  prevText = "newer",
  nextText = "older",
  ...rest
}: IPaginationProps): JSX.Element {
  const numPages = Math.ceil(numberOfItems / perPage);

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPageUrl =
    currentPage === 2 ? `${urlRoot}` : `${urlRoot}page-${currentPage - 1}/`;

  const nextPageUrl = `${urlRoot}page-${currentPage + 1}/`;

  const prev = isFirst ? (
    <span />
  ) : (
    <Link to={prevPageUrl} textAlign="left">{`← ${prevText}`}</Link>
  );

  const next = isLast ? (
    <span />
  ) : (
    <Link to={nextPageUrl} textAlign="right">{`${nextText} →`}</Link>
  );

  return (
    <Box as="section" fontSize="pagination" {...rest}>
      <ScreenReaderOnly>
        <h3>Pagination</h3>
      </ScreenReaderOnly>
      <Box display="flex" justifyContent="space-between">
        {prev}
        {next}
      </Box>
      <Spacer axis="vertical" size={24} />
      <Box textAlign="right" color="subtle">
        Page{" "}
        <Box as="select" value={currentPage} onChange={onSelectPage}>
          {Array.from({ length: numPages }, (_, i) => i + 1).map((num) => {
            return (
              <option key={num} value={num}>
                {num}
              </option>
            );
          })}
        </Box>{" "}
        of {numPages}
      </Box>
    </Box>
  );
}
