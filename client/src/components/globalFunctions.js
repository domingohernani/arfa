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
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  console.log(formattedDate);

  return formattedDate;
};

// yung parameter is dapat Object na merong review Objects
export const calculateRatingSummary = (reviews) => {
  const reviewArr = Object.values(reviews);

  const { average, ratingCounter } = reviewArr.reduce(
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

  const percentages = Object.keys(ratingCounter).reduce((acc, rating) => {
    acc[rating] =
      reviewArr.length > 0
        ? (ratingCounter[rating] / reviewArr.length) * 100
        : 0;
    return acc;
  }, {});

  const ratingSummary = {
    average,
    ratingCounter,
    percentages,
    numberOfRatings: reviewArr.length,
  };
  return ratingSummary;
};
