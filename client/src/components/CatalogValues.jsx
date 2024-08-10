export const sortOptions = [
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

export const subCategories = [
  { name: "Living Room", href: "category/living-room" },
  { name: "Bedroom", href: "category/bedroom" },
  { name: "Dining Room", href: "category/dining-room" },
  { name: "Office", href: "category/office" },
  { name: "Outdoor", href: "category/outdoor" },
  { name: "Accent", href: "category/accent" },
  { name: "Storage", href: "category/storage" },
  { name: "Entryway", href: "category/entryway" },
];

export const filters = [
  {
    id: "filter",
    name: "Filter",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    options: [
      { value: "testing low", label: "From", checked: false },
      { value: "testing high", label: "To", checked: false },
      { label: "searchPrice" },
    ],
  },
];

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
