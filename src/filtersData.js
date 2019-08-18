export const getFilters = () => {
  return [
    {
      title: `All movies`,
      count: ``,
      isActive: true,
      isAdditional: false,
    },
    {
      title: `Watchlist `,
      count: 13,
      isActive: false,
      isAdditional: false,
    },
    {
      title: `History `,
      count: 4,
      isActive: false,
      isAdditional: false,
    },
    {
      title: `Favorites `,
      count: 8,
      isActive: false,
      isAdditional: false,
    },
    {
      title: `Stats`,
      count: ``,
      isActive: false,
      isAdditional: true,
    },
  ];
};
