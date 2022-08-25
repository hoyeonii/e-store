import { useState } from "react";
import { useQuery } from "react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Reviews from "./Pages/Reviews";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppinCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
//Styles
import { Wrapper, StyledButton } from "./App.styles";

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
