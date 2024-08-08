import { average } from "firebase/firestore";

export function formatToPeso(amount) {
  return "₱" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const unSlug = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const toSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

export const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleString();
};

// yung parameter is dapat Object na merong review Objects
export const calculateRatingSummary = (reviews) => {
  const reviewArr = Object.values(reviews);
  const rating = reviewArr.reduce(
    ({ average, ratingCounter }, review, index, { length }) => {
      average += review.rating / length;
      ratingCounter[review.rating] = ratingCounter[review.rating] + 1;
      return { average, ratingCounter };
    },
    {
      average: 0,
      ratingCounter: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
  );
  rating.numberOfRatings = reviewArr.length;
  return rating;
};
