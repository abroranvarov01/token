import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import MainLayout from "./layout/main-layout";
import Meassage from "./pages/message/message";
function App() {
  return (
    <Routes path="/">
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Meassage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
