/**
 * Slices a page out of a given T collection.
 */
export default function slicePage<T>({
  collection,
  pageToSlice,
  perPage,
}: {
  /** The total collection. */
  collection: T[];
  /** The page to slice (starting at 1). */
  pageToSlice: number;
  /** Number of reviews per page. */
  perPage: number;
}): T[] {
  const skip = perPage * (pageToSlice - 1);
  return collection.slice(skip, pageToSlice * perPage);
}
