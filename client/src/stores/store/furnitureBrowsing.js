export const furnitureBrowsing = (set) => ({
  isSaleOnly: false,
  updateIsSaleOnly: (value) => set(() => ({ isSaleOnly: value })),

  isNewArrivalsOnly: false,
  updateIsNewArrivalsOnly: (value) => set(() => ({ isNewArrivalsOnly: value })),

  minPrice: "",
  updateMinPrice: (value) => set(() => ({ minPrice: value })),

  maxPrice: "",
  updateMaxPrice: (value) => set(() => ({ maxPrice: value })),

  sortOption: null,
  setSortOption: (value) => set(() => ({ sortOption: value })),

  is3dOpen: false,
  updateIs3dOpen: (value) => set(() => ({ is3dOpen: value })),

  isQRCodeOpen: false,
  updateIsQRCodeOpen: (value) => set(() => ({ isQRCodeOpen: value })),
});
