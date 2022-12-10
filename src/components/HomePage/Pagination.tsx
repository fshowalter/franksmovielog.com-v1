import { navigate } from "gatsby";
import { ChangeEvent } from "react";
import { Box, IBoxProps } from "../Box";
import { gridAreaComponent, gridComponent } from "../Grid";
import { Link } from "../Link";
import { gridAreas, gridStyle } from "./Pagination.css";

const GridArea = gridAreaComponent(gridAreas);

const Grid = gridComponent(gridStyle);

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
  prevText,
  nextText,
  ...rest
}: IPaginationProps): JSX.Element {
  const numPages = Math.ceil(numberOfItems / perPage);

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const prevPageUrl =
    currentPage === 2 ? `${urlRoot}` : `${urlRoot}page-${currentPage - 1}/`;

  const nextPageUrl = `${urlRoot}page-${currentPage + 1}/`;

  const prev = isFirst ? null : (
    <Link
      to={prevPageUrl}
      color="accent"
      textDecoration="none"
    >{`← ${prevText}`}</Link>
  );

  const next = isLast ? null : (
    <Link
      to={nextPageUrl}
      color="accent"
      textDecoration="none"
    >{`${nextText} →`}</Link>
  );

  return (
    <Grid as="section" fontSize={20} {...rest}>
      <Box as="h3" screenReaderOnly={true}>
        Pagination
      </Box>
      <GridArea name="prev">{prev}</GridArea>
      <GridArea name="pages">
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
      </GridArea>
      <GridArea name="next">{next}</GridArea>
    </Grid>
  );
}
