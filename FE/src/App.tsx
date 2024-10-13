import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/client/home";
import LayoutClient from "./components/layout/layoutClient/layoutClient";
import Dashboard from "./pages/admin/dashboard";
import NotFound from "./pages/NotFound";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import ListProduct from "./pages/admin/products/ListProduct";
import ListCategory from "./pages/admin/categories/ListCategory";
import AdminOrder from "./pages/admin/orders/Order";
import ListUser from "./pages/admin/users/ListUser";
import ListColor from "./pages/admin/colors/ListColor";
import ListSize from "./pages/admin/sizes/ListSize";
import AddProducts from "./pages/admin/products/AddProducts";
import AddColor from "./pages/admin/colors/AddColor";
import AddSize from "./pages/admin/sizes/AddSize";
import Detail from "./pages/client/detail";
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
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/product-add" element={<AddProducts />} />
          <Route path="/admin/category" element={<ListCategory />} />
          <Route path="/admin/color" element={<ListColor />} />
          <Route path="/admin/color-add" element={<AddColor />} />
          <Route path="/admin/size" element={<ListSize />} />
          <Route path="/admin/size-add" element={<AddSize />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/user" element={<ListUser />} />
          <Route path="" element />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
