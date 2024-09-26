import { average } from "firebase/firestore";
import { formatDistanceToNowStrict } from "date-fns";
import { uploadPhoto } from "../firebase/photos";

export function formatToPeso(amount) {
  return (
    "₱" +
    Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
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

export const getOrderStatusStyles = (orderStatus) => {
  let statusText;
  let colorClass;
  let bgColorClass;

  // Determine order status and corresponding color
  switch (orderStatus) {
    case "Placed":
      statusText = "Placed";
      colorClass = "text-blue-600"; // Blue for "Placed"
      bgColorClass = "bg-blue-400";
      break;
    case "Confirmed":
      statusText = "Confirmed";
      colorClass = "text-indigo-500"; // Indigo for "Confirmed"
      bgColorClass = "bg-indigo-500";
      break;
    case "Preparing":
      statusText = "Preparing";
      colorClass = "text-orange-500"; // Orange for "Preparing"
      bgColorClass = "bg-orange-400";
      break;
    case "Ready":
      statusText = "Ready";
      colorClass = "text-yellow-300"; // Yellow for "Ready"
      bgColorClass = "bg-yellow-300";
      break;
    case "Out of Delivery":
      statusText = "Out of Delivery";
      colorClass = "text-purple-500"; // Purple for "Out for Delivery"
      bgColorClass = "bg-purple-500";
      break;
    case "Delivered":
      statusText = "Delivered";
      colorClass = "text-green-500"; // Green for "Delivered"
      bgColorClass = "bg-green-500";
      break;
    case "Cancelled":
      statusText = "Cancelled";
      colorClass = "text-red-500"; // Red for "Cancelled"
      bgColorClass = "bg-red-500";
      break;
    case "Returned":
      statusText = "Returned";
      colorClass = "text-gray-500"; // Gray for "Returned"
      bgColorClass = "bg-gray-500";
      break;
    case "Refunded":
      statusText = "Refunded";
      colorClass = "text-teal-500"; // Teal for "Refunded"
      bgColorClass = "bg-teal-500";
      break;
    default:
      statusText = "Unknown";
      colorClass = "text-black"; // Black for unknown status
      bgColorClass = "bg-black";
      break;
  }

  return { statusText, colorClass, bgColorClass };
};

// para sa chats
export const formatTimeAgo = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "";

  const date = new Date(timestamp.seconds * 1000);

  const fullTimeAgo = formatDistanceToNowStrict(date, { addSuffix: false });
  return fullTimeAgo
    .replace(/ seconds?/, "s")
    .replace(/ minutes?/, "m")
    .replace(/ hours?/, "h")
    .replace(/ days?/, "d")
    .replace(/ weeks?/, "w")
    .replace(/ months?/, "mo")
    .replace(/ years?/, "y");
};

export const convertBlobUrlToFile = async (blobUrl, fileName) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  const fileType = blob.type;

  return new File([blob], fileName, { type: fileType });
};

export const blobsToImagesPaths = async (variants, id) => {
  return await Promise.all(
    variants.map(async (variant) => {
      const updatedImagePaths = await Promise.all(
        variant.imagePaths.map(async (url, index) => {
          if (url.includes("blob")) {
            const file = await convertBlobUrlToFile(
              url,
              `${variant.name}-${index}`
            );
            const fileName = `${id}-${Date.now()}.jpg`;
            const path = `images/${id}/${fileName}`;
            const newUrl = await uploadPhoto(file, path);
            return newUrl;
          }
          return url;
        })
      );

      return {
        ...variant,
        imagePaths: updatedImagePaths,
      };
    })
  );
};