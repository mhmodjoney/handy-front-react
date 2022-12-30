import React from "react";
import { useParams } from "react-router-dom";

export default function Products() {
  const { id } = useParams();
  return <div>Product {id}</div>;
}
