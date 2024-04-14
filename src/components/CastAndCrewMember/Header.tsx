import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { avatarStyle } from "./CastAndCrewMember.css";

function creditList(member: Queries.CastAndCrewMemberFragment): string {
  const creditString = new Intl.ListFormat().format(member.creditedAs);

  return creditString.charAt(0).toUpperCase() + creditString.slice(1);
}

function reviewedTitleCount(member: Queries.CastAndCrewMemberFragment): string {
  return `${member.reviewCount} reviewed`;
}

function watchlistTitleCount(
  member: Queries.CastAndCrewMemberFragment,
): string {
  if (member.reviewCount === member.totalCount) {
    return "";
  }

  const watchlistTitleCount = member.totalCount - member.reviewCount;

  return ` and ${watchlistTitleCount} watchlist`;
}

function titles(member: Queries.CastAndCrewMemberFragment): string {
  const watchlistTitleCount = member.totalCount - member.reviewCount;

  if (member.reviewCount === 1 && watchlistTitleCount < 2) {
    return "title";
  }

  return `titles`;
}

export function Header({
  member,
}: {
  member: Queries.CastAndCrewMemberFragment;
}): JSX.Element {
  return (
    <>
      <Box textAlign="center" lineHeight={36}>
        <Link to="/cast-and-crew/">Cast & Crew</Link>
      </Box>
      <Spacer axis="vertical" size={16} />
      <Box display="flex" flexDirection="column" alignItems="center">
        <GraphqlImage
          image={member.avatar}
          alt={member.name}
          borderRadius="half"
          transform="safariBorderRadiusFix"
          className={avatarStyle}
        />
      </Box>
      <Spacer axis="vertical" size={16} />
      <PageTitle textAlign="center">{member.name}</PageTitle>
      <Spacer axis="vertical" size={24} />
      <Box
        color="subtle"
        textAlign="center"
        paddingX="gutter"
      >{`${creditList(member)} with ${reviewedTitleCount(member)}${watchlistTitleCount(member)} ${titles(member)}.`}</Box>
    </>
  );
}
