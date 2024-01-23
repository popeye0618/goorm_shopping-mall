import { useEffect, useState } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import LoadingScreen from "../components/loading-screen";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  gap: 40px;
`;

const Tag = styled.div`
  display: flex;
  width: 12rem;
  height: 4rem;
  border: 2px solid black;
  border-radius: 3px;
  padding: 15px 30px;
  color: black;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: gray;
    color: white;
    border: none;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: stretch;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 400px;
  max-width: 300px;
  margin: auto;
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0;
    padding: 10px;
  }
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  cursor: pointer;
  transition: transform 0.3 ease, box-shadow 0.3 ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImg = styled.img`
  width: 60%;
  height: 50%;
  margin: 20px;
`;

const ProductTitle = styled.span`
  font-size: 18px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  width: 80%;
`;

const ToCart = styled.div`
  padding: 13px 20px;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 13px;
  color: #999;
  &:hover {
    background-color: #999;
    color: white;
    cursor: pointer;
  }
`;

const PriceTag = styled.span`
  font-size: 1rem;
`;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const categoryName = ["모두", "전자기기", "쥬얼리", "남성의류", "여성의류"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const categories = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok || !categories.ok) {
          throw new Error("네트워크 오류");
        }
        const data = await response.json();
        const list = await categories.json();
        setProducts(data);
        setCategories(list);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("에러가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (error) {
    alert(error);
  }

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const onProductClick = (productId: string) => {
    navigate(`product/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    alert("장바구니에 담겼습니다.");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <Layout />
      <Title>Products</Title>
      <List>
        {["all", ...categories].map((category, index) => (
          <Tag key={index} onClick={() => setSelectedCategory(category)}>
            {categoryName[index]}
          </Tag>
        ))}
      </List>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <GridContainer>
          {filteredProducts.map((product) => {
            return (
              <GridItem
                key={product.id}
                onClick={() => onProductClick(product.id)}
              >
                <ProductImg src={product.image} />
                <ProductTitle>
                  {product.title.length > 13
                    ? `${product.title.substring(0, 16)}...`
                    : product.title}
                </ProductTitle>
                <Div>
                  <ToCart
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    장바구니에 담기
                  </ToCart>
                  <PriceTag>{`$ ${product.price}`}</PriceTag>
                </Div>
              </GridItem>
            );
          })}
        </GridContainer>
      )}
    </Wrapper>
  );
}
