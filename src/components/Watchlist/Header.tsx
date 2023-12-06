import { foregroundColors } from "../../styles/colors.css";
import type { IBoxProps } from "../Box";
import { Box } from "../Box";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { linkStyle } from "./Header.css";

const PeopleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={foregroundColors.default}
    width={20}
    height={20}
  >
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const CollectionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={foregroundColors.default}
    width={20}
    height={20}
  >
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
  </svg>
);

interface IWatchlistEntityTypeLinkProps extends IBoxProps {
  entityType: "director" | "writer" | "collection" | "performer";
}

const entityTypeProps = {
  director: {
    to: "/watchlist/directors/",
    icon: PeopleIcon,
    label: "Directors",
  },
  performer: {
    to: "/watchlist/performers/",
    icon: PeopleIcon,
    label: "Performers",
  },
  writer: {
    to: "/watchlist/writers/",
    icon: PeopleIcon,
    label: "Writers",
  },
  collection: {
    to: "/watchlist/collections/",
    icon: CollectionIcon,
    label: "Collections",
  },
};

function BrowseEntityTypeLink({
  entityType,
  ...rest
}: IWatchlistEntityTypeLinkProps): JSX.Element {
  const props = entityTypeProps[entityType];

  return (
    <Box display="block" {...rest}>
      <Link
        to={props.to}
        display="flex"
        columnGap={16}
        boxShadow="borderAll"
        paddingX={16}
        paddingY={8}
        borderRadius={8}
        alignItems="center"
        className={linkStyle}
        justifyContent="center"
      >
        <Box flexShrink={0}>{props.icon}</Box>
        {props.label}
      </Link>
    </Box>
  );
}

export function Header({ titleCount }: { titleCount: number }): JSX.Element {
  return (
    <>
      <PageTitle textAlign="center">Watchlist</PageTitle>
      <Box as="q" display="block" textAlign="center" color="subtle">
        A man&apos;s got to know his limitations.
      </Box>
      <Spacer axis="vertical" size={32} />

      <Box as="p" color="subtle" maxWidth="shortForm">
        My movie review bucketlist. {titleCount.toLocaleString()} titles. No
        silents or documentaries.{" "}
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box as="p" color="subtle">
        Track my <Link to="/watchlist/progress/">progress</Link>.
      </Box>
      <Spacer axis="vertical" size={32} />
      <Box as="ul" display="flex" flexWrap="wrap" columnGap={32} rowGap={24}>
        <BrowseEntityTypeLink as="li" flex={1} entityType="director" />
        <BrowseEntityTypeLink as="li" flex={1} entityType="performer" />
        <BrowseEntityTypeLink as="li" flex={1} entityType="writer" />
        <BrowseEntityTypeLink as="li" flex={1} entityType="collection" />
      </Box>
    </>
  );
}
