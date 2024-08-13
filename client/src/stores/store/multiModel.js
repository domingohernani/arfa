export const multiModel = (set) => ({
  isSaleOnly: false,
  updateIsSaleOnly: (value) => set(() => ({ isSaleOnly: value })),
});
