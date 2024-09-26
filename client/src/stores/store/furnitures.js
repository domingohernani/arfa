export const furnitures = (set) => ({
  rowFurnituresData: [],
  setRowFurnituresData: (data) => set({ rowFurnituresData: data }),

  variants: [
    { name: "", imagePaths: [] },
    { name: "", imagePaths: [] },
  ],
  setVariants: (data) => set({ variants: data }),
  initializeVariants: (currentVariants) =>
    set({
      variants:
        currentVariants.length > 0
          ? currentVariants
          : [
              { name: "", imagePaths: [] },
              { name: "", imagePaths: [] },
            ],
    }),
  // Add this function to clear the variants
  clearVariants: () =>
    set({
      variants: [
        { name: "", imagePaths: [] },
        { name: "", imagePaths: [] },
      ],
    }),
});
