import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import LayoutClient from "./components/layout/layoutClient/layoutClient";
import Home from "./pages/client/home";
import Detail from "./pages/client/detail";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import Cart from "./pages/client/cart";

function App() {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="detail" element={<Detail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="" element />
          <Route path="" element />
          <Route path="" element />
        </Route>
        {/* Admin */}
        <Route path="/admin" element>
          <Route index element={<LayoutAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
