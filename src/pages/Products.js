import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import axios from "axios";
import Product from "../components/Shopping/Product";
import Loading from "../components/Loading";

export default function Products() {
  const { categorey } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${categorey}`)
      .then((res) => {
        const data = res.data.products;
        setProducts(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="products m-0 p-0 mx-auto">
      <NavBar selectedTab="Shopping" />
      {products.length === 0 ? (
        <Loading />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 mx-auto">
          {products.map((obj, i) => (
            <Product product={obj} />
          ))}
        </div>
      )}
    </div>
  );
}
