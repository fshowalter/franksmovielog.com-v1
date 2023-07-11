export function buildGroupItems<T, S>(
  itemGrouper: (item: T, sortValue: S) => string,
) {
  return function groupItems(items: T[], sortValue: S): Map<string, T[]> {
    const groupedItems = new Map<string, T[]>();

    items.map((item) => {
      const group = itemGrouper(item, sortValue);
      let groupValue = groupedItems.get(group);

      if (!groupValue) {
        groupValue = [];
        groupedItems.set(group, groupValue);
      }
      groupValue.push(item);
    });

    return groupedItems;
  };
}
