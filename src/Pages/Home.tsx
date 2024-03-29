import { useState } from "react";
import { useQuery } from "react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Order from "./Order";
import Item from "../Item/Item";
import Cart from "../Cart/Cart";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppinCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
//Styles
import { Wrapper, StyledButton } from "../App.styles";
//Types
import { CartItemType } from "../App";

export interface IHomeProps {}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const Home: React.FC<IHomeProps> = (props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clikedItem: CartItemType) => {
    setCartItems((prev) => {
      //check if it's already in the cart
      const isItemInCart = prev.find((item) => item.id === clikedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clikedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clikedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong..</div>;
  return (
    <div>
      <p>Home 화면 입니다</p>
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppinCartIcon />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}></Item>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
};
export default Home;
