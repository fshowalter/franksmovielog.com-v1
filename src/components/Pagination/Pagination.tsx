import { navigate } from "gatsby";
import { ChangeEvent } from "react";
import { Box, IBoxProps } from "../Box";
import { Link } from "../Link";

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
    <Link
      to={prevPageUrl}
      color="accent"
      textDecoration="none"
      textAlign="left"
    >{`← ${prevText}`}</Link>
  );

  const next = isLast ? (
    <span />
  ) : (
    <Link
      to={nextPageUrl}
      color="accent"
      textDecoration="none"
      textAlign="right"
    >{`${nextText} →`}</Link>
  );

  return (
    <Box as="section" fontSize="pagination" {...rest}>
      <Box as="h3" screenReaderOnly={true}>
        Pagination
      </Box>
      <Box display="flex" justifyContent="space-between">
        {prev}
        {next}
      </Box>
      <Box textAlign="right">
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
