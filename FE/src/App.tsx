import { Route, Routes } from "react-router-dom";
import LayoutClient from "./components/layout/layoutClient/layoutClient";
import { BiHome } from "react-icons/bi";

import CategoryContext from "./contexts/CategoryContext";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import Dashboard from "./pages/admin/dashboard";
import ListProduct from "./pages/admin/product/ListProduct";
import ListCategory from "./pages/admin/category/ListCategory";
import AddCategory from "./pages/admin/category/AddCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import ListColor from "./pages/admin/color/ListColor";
import AddColor from "./pages/admin/color/AddColor";
import ListSize from "./pages/admin/size/ListSize";
import AdminOrder from "./pages/admin/order/Order";
import ListUser from "./pages/admin/user/ListUser";
import NotFound from "./pages/NotFound";
import ProductContext from "./contexts/productContext";

function App() {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<BiHome />} />
          <Route path="" element />
          <Route path="" element />
          <Route path="" element />
          <Route path="" element />
          <Route path="" element />
        </Route>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProductContext>
              <CategoryContext>
                <LayoutAdmin />
              </CategoryContext>
            </ProductContext>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin/product" element={<ListProduct />} />
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
