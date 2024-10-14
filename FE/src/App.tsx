import { Route, Routes } from "react-router-dom";
import Home from "./pages/client/home";
import LayoutClient from "./components/layout/layoutClient/layoutClient";
import Dashboard from "./pages/admin/dashboard";
import NotFound from "./pages/NotFound";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import Detail from "./pages/client/detail";
import Cart from "./pages/client/cart";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import ListProduct from "./pages/admin/product/ListProduct";
import AddProducts from "./pages/admin/product/AddProducts";

import ListColor from "./pages/admin/color/ListColor";
import AddColor from "./pages/admin/color/AddColor";
import ListSize from "./pages/admin/size/ListSize";
import AdminOrder from "./pages/admin/order/Order";
import ListUser from "./pages/admin/user/ListUser";
import CategoryContext from "./contexts/CategoryContext";
import AddCategory from "./pages/admin/category/AddCategory";
import ListCategory from "./pages/admin/category/ListCategory";

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
        <Route
          path="/admin"
          element={
            <CategoryContext>
              <LayoutAdmin />
            </CategoryContext>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/product-add" element={<AddProducts />} />
          <Route path="/admin/category" element={<ListCategory />} />

          <Route path="/admin/category-add" element={<AddCategory />} />
          <Route path="/admin/category-edit/:id" element={<UpdateCategory />} />
          <Route path="/admin/color" element={<ListColor />} />
          <Route path="/admin/color-add" element={<AddColor />} />
          <Route path="/admin/size" element={<ListSize />} />
          {/* <Route path="/admin/size-add" element={<AddSize />} /> */}

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
