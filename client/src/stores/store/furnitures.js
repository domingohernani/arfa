export const furnitures = (set) => ({
  rowFurnituresData: [],
  setRowFurnituresData: (data) => set({ rowFurnituresData: data }),

  detectedVariants: [],
  setDetectedVariants: (data) => set({ detectedVariants: data }),
  resetDetectedVariants: (data) => set({ detectedVariants: data }),

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
