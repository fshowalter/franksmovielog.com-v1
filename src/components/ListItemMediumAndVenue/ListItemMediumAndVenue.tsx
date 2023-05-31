export function ListItemMediumAndVenue({
  medium,
  venue,
}: {
  medium?: string | null;
  venue?: string | null;
}): JSX.Element | null {
  if (medium && venue) {
    return (
      <>
        <div>
          {medium} at {venue}
        </div>
      </>
    );
  }

  if (medium) {
    return (
      <>
        <div>{medium}</div>
      </>
    );
  }

  if (venue) {
    return (
      <>
        <div>{venue}</div>
      </>
    );
  }

  return null;
}
