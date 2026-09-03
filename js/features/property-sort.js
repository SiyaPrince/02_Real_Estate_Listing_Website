/**
 * LarHub Property Sorting
 */

export function sortProperties(
  properties,
  sort
) {
  const copy = [...properties];

  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) => a.price - b.price
      );

    case "price-desc":
      return copy.sort(
        (a, b) => b.price - a.price
      );

    case "newest":
      return copy.sort(
        (a, b) => (
          new Date(b.listedDate)
          - new Date(a.listedDate)
        )
      );

    default:
      return copy.sort(
        (a, b) => {
          if (
            a.featured !== b.featured
          ) {
            return Number(b.featured)
              - Number(a.featured);
          }

          return (
            new Date(b.listedDate)
            - new Date(a.listedDate)
          );
        }
      );
  }
}
