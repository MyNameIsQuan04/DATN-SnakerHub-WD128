import { Route, Routes } from "react-router-dom";
import Home from "./pages/client/home";
import LayoutClient from "./components/layout/layoutClient/layoutClient";
<<<<<<< HEAD
import Detail from "./pages/client/detail";
import Cart from "./pages/client/cart";
import CategoryContext from "./contexts/CategoryContext";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import Dashboard from "./pages/admin/dashboard";
import ListProduct from "./pages/admin/product/ListProduct";
import AddProducts from "./pages/admin/product/AddProducts";
import ListCategory from "./pages/admin/category/ListCategory";
import AddCategory from "./pages/admin/category/AddCategory";
import ListColor from "./pages/admin/color/ListColor";
import AddColor from "./pages/admin/color/AddColor";
import ListSize from "./pages/admin/size/ListSize";
import AdminOrder from "./pages/admin/order/Order";
import ListUser from "./pages/admin/user/ListUser";
import NotFound from "./pages/NotFound";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
=======
import Dashboard from "./pages/admin/dashboard";
import NotFound from "./pages/NotFound";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import ListProduct from "./pages/admin/ListProduct";
import ListCategory from "./pages/admin/ListCategory";
import AdminOrder from "./pages/admin/AdminOrder";
import ListUser from "./pages/admin/ListUser";
>>>>>>> e9be99263df2fe2851a5d47710c3179d7457757e

function App() {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
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
            <CategoryContext>
              <LayoutAdmin />
            </CategoryContext>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/category" element={<ListCategory />} />
<<<<<<< HEAD
          <Route path="/admin/category-add" element={<AddCategory />} />
          <Route path="/admin/category-edit/:id" element={<UpdateCategory />} />
          <Route path="/admin/color" element={<ListColor />} />
          <Route path="/admin/color-add" element={<AddColor />} />
          <Route path="/admin/size" element={<ListSize />} />
          {/* <Route path="/admin/size-add" element={<AddSize />} /> */}
=======
>>>>>>> e9be99263df2fe2851a5d47710c3179d7457757e
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
