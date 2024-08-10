export const furnitureBrowsing = (set) => ({
  isSaleOnly: false,
  updateIsSaleOnly: (value) => set(() => ({ isSaleOnly: value })),

  isNewArrivalsOnly: false,
  updateIsNewArrivalsOnly: (value) => set(() => ({ isNewArrivalsOnly: value })),

  minPrice: "",
  updateMinPrice: (value) => set(() => ({ minPrice: value })),
  
  maxPrice: "",
  updateMaxPrice: (value) => set(() => ({ maxPrice: value })),

  
});
