import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import styled from "styled-components";
import Shop from "./pages/category/Citrus";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemDetail from "./pages/ItemDetail";
import Pick from "./pages/Pick";
import Cart from "./pages/Cart";
import FindPassword from "./pages/FindPassword";
import Payment from "./pages/Payment";
import User from "./pages/User";
import PaymentComplete from "./pages/PaymentComplete";
import Order from "./pages/Order";
import Admin from "./pages/_Admin";
import Search from "./pages/Search";
import AdminLogin from "./pages/AdminLogin";
import Citrus from "./pages/category/Citrus";
import AddItem from "./pages/admin/AdminAddItem";
import AdminMain from "./pages/admin/AdminMain";
import AdminAddItem from "./pages/admin/AdminAddItem";
import AdminViewItem from "./pages/admin/AdminViewItem";
import Musk from "./pages/category/Musk";
import Sweet from "./pages/category/Sweet";
import Soap from "./pages/category/Soap";
import Floral from "./pages/category/Floral";
import Woody from "./pages/category/Woody";
import AdminEditItem from "./pages/admin/AdminEditItem";
import AdminViewOrder from "./pages/admin/AdminViewOrder";
import AdminDetailOrder from "./pages/admin/AdminDetailOrder";
import FindId from "./pages/FindId";
import CompanyInfo from "./pages/CompanyInfo";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  font-family: "Libre Franklin";
`;
function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />

          
          <Route path="/citrus" element={<Citrus />} />
          <Route path="/musk" element={<Musk />} />
          <Route path="/sweet" element={<Sweet />} />
          <Route path="/soap" element={<Soap />} />
          <Route path="/floral" element={<Floral />} />
          <Route path="/woody" element={<Woody />} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/item" element={<ItemDetail />} />
          <Route path="/pick" element={<Pick />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user" element={<User />} />

          <Route path="/complete" element={<PaymentComplete />} />

          <Route path="/order" element={<Order />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/admin/item/add" element={<AdminAddItem />} />
          <Route path="/admin/item/view" element={<AdminViewItem />} />
          <Route path="/admin/item/edit" element={<AdminEditItem />} />
          <Route path="/admin/order/view" element={<AdminViewOrder />} />
          <Route path="/admin/order/view/detail" element={<AdminDetailOrder />} />

          <Route path="/search" element={<Search />} />
          <Route path="/company" element={<CompanyInfo />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
