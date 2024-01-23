import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const getProduct = async () => {
    const json = await (
      await fetch(`https://fakestoreapi.com/products/${id}`)
    ).json();
  };
  useEffect(() => {
    getProduct();
  }, []);
  return <h1>detail</h1>;
}
