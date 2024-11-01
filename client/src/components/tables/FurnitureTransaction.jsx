import { useParams } from "react-router-dom";

export const FurnitureTransaction = () => {
  const { id } = useParams();
  return <div>Transaction ID: {id}</div>;
};
