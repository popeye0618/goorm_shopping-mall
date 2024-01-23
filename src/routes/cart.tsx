import styled from "styled-components";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import { Product } from "./home";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  font-weight: bold;
`;

const Switcher = styled.div`
  margin-top: 200px;
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 600;
`;

const Caution = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  align-items: center;
  margin: 0px 100px;
`;

const MyItem = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  align-items: center;
  gap: 40px;
  margin: 10px 0px;
  padding: 20px 20px;
  border-bottom: 1px solid #999;
`;

const ItemImg = styled.img`
  width: 150px;
  height: 100%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 100%;
  gap: 15px;
`;

const Category = styled.span`
  font-size: 1.2rem;
  color: #999;
`;

const ProductTitle = styled.span`
  white-space: normal;
  max-width: 100%;
  font-size: 1.4rem;
`;

const Price = styled.span`
  font-size: 1.2rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 20%;
`;

const QuantityBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  width: 70px;
  height: 70px;
`;

const DeleteItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: baseline;
  justify-content: center;
  height: 50px;
  width: 50px;
  border: none;
  margin-left: 20%;
  svg {
    width: 30px;
    color: #ddd;
  }
`;

interface ResultProps {
  totalPrice: number;
}
const Result = styled.div<ResultProps>`
  display: ${(props) => (props.totalPrice > 0 ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  margin-left: 55%;
  width: 30%;
  height: 10%;
  gap: 30px;
`;

const Sum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: beige;
  font-size: 1.5rem;
`;

const Pay = styled.div`
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  color: #999;
  cursor: pointer;
  &:hover {
    background-color: #999;
    color: white;
  }
`;

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const onQuantityClick = (product: Product, change: string) => {
    if (change === "+") {
      dispatch(addToCart(product));
    } else if (change === "-") {
      dispatch(decreaseQuantity(product.id));
    }
  };

  const onDeleteClick = (product: Product) => {
    dispatch(removeFromCart(product.id));
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <Wrapper>
      <Layout />
      <Title>장바구니</Title>
      <List>
        {cartItems.length === 0 ? (
          <Switcher>
            <Caution>장바구니가 비었습니다!</Caution>
            <Link to="/">쇼핑하러가기</Link>
          </Switcher>
        ) : (
          cartItems.map((item, index) => (
            <MyItem key={index}>
              <ItemImg src={item.product.image} />
              <Description>
                <Category>{item.product.category}</Category>
                <ProductTitle>
                  {item.product.title.length > 70
                    ? `${item.product.title.substring(0, 70)}...`
                    : item.product.title}
                </ProductTitle>
                <Price>{`${item.product.price} x ${item.quantity} = $ ${Number(
                  totalPrice.toFixed(2)
                )}`}</Price>
              </Description>
              <QuantityContainer>
                <QuantityBtn onClick={() => onQuantityClick(item.product, "-")}>
                  -
                </QuantityBtn>
                <Quantity>{item.quantity}</Quantity>
                <QuantityBtn onClick={() => onQuantityClick(item.product, "+")}>
                  +
                </QuantityBtn>
              </QuantityContainer>
              <DeleteItem onClick={() => onDeleteClick(item.product)}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  />
                </svg>
              </DeleteItem>
            </MyItem>
          ))
        )}
      </List>
      <Result totalPrice={totalPrice}>
        <Sum>{`합계: $ ${Number(totalPrice.toFixed(2))}`}</Sum>
        <Pay>계산하기</Pay>
      </Result>
    </Wrapper>
  );
}
