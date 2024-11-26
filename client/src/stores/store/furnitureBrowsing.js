export const furnitureBrowsing = (set) => ({
  isSaleOnly: false,
  updateIsSaleOnly: (value) => set(() => ({ isSaleOnly: value })),

  searchValue: "",
  updateSearchValue: (value) => set(() => ({ searchValue: value })),
  // search: false,
  // searchTrigger: (value) => set(() => ({ searchTrigger: value })),

  isNewArrivalsOnly: false,
  updateIsNewArrivalsOnly: (value) => set(() => ({ isNewArrivalsOnly: value })),

  minPrice: "",
  updateMinPrice: (value) => set(() => ({ minPrice: value })),

  maxPrice: "",
  updateMaxPrice: (value) => set(() => ({ maxPrice: value })),

  width: "",
  updateWidth: (value) => set(() => ({ width: value })),

  depth: "",
  updateDepth: (value) => set(() => ({ depth: value })),

  height: "",
  updateHeight: (value) => set(() => ({ height: value })),

  sortOption: null,
  setSortOption: (value) => set(() => ({ sortOption: value })),

  is3dOpen: false,
  updateIs3dOpen: (value) => set(() => ({ is3dOpen: value })),

  isImgsOpen: false,
  updateIsImgsOpen: (value) => set(() => ({ isImgsOpen: value })),

  isQRCodeOpen: false,
  updateIsQRCodeOpen: (value) => set(() => ({ isQRCodeOpen: value })),

  isAddToCartOpen: false,
  updateIsAddToCartOpen: (value) => set(() => ({ isAddToCartOpen: value })),
});
