import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";
import styled from "styled-components";
import Layout from "../components/layout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
  margin: 30px 200px;
`;

const ProductImg = styled.img`
  width: 40%;
  height: 70%;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  gap: 30px;
`;

const Category = styled.h2`
  font-size: 1.8rem;
  color: #999;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const PriceTag = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;

const Description = styled.span`
  font-size: 1.2rem;
  color: #999;
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: auto;
  margin-top: 10%;
`;

const Cartbtn = styled.div`
  width: 45%;
  height: 50px;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  &:hover {
    background-color: #999;
    color: white;
    cursor: pointer;
  }
`;

export interface Product {
  id: string;
  image: string;
  category: string;
  title: string;
  price: number;
  description: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const getProduct = async () => {
    try {
      setLoading(true);
      const product = await (
        await fetch(`https://fakestoreapi.com/products/${id}`)
      ).json();
      setProduct(product);
      console.log(product);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  const onCartClick = () => {
    navigate("/Cart");
  };

  return (
    <Wrapper>
      <Layout />
      <Main>
        <ProductImg src={product.image} alt={product.title} />
        <ProductDetails>
          <Category>{product.category}</Category>
          <Title>{product.title}</Title>
          <PriceTag>{`$ ${product.price}`}</PriceTag>
          <Description>{product.description}</Description>
          <Btns>
            <Cartbtn>장바구니에 담기</Cartbtn>
            <Cartbtn onClick={onCartClick}>장바구니로 이동</Cartbtn>
          </Btns>
        </ProductDetails>
      </Main>
    </Wrapper>
  );
}
