import { Route, Routes } from "react-router-dom";
import LayoutClient from "./components/layout/layoutClient/layoutClient";
import Dashboard from "./pages/admin/dashboard";
import NotFound from "./pages/NotFound";
import LayoutAdmin from "./components/layout/layoutAdmin/layoutAdmin";
import Detail from "./pages/client/detail";
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
import Home from "./pages/client/home";
import ColorContext from "./contexts/ColorContext";
import SizeContext from "./contexts/SizeContext";
import EditProduct from "./pages/admin/product/EditProduct";
import Checkout from "./pages/client/checkout";
import Cart from "./pages/client/cart";
import AuthForm from "./pages/client/AuthForm";
import UpdateColor from "./pages/admin/color/UpdateColor";
import AddSize from "./pages/admin/size/AddSize";
import UpdateSize from "./pages/admin/size/UpdateSize";
import Products from "./pages/client/products";
import OrderContext from "./contexts/OrderContext";
import ThankYou from "./pages/client/Thankyou";
import Contact from "./pages/client/contact";
import PrivateAdmin from "./pages/PrivateAdmin";
import ForgotPassword from "./pages/client/forgot-password";
import Mail from "./pages/client/mail";
import ResetPassword from "./pages/client/reset-password";
import AddVoucher from "./pages/admin/Voucher/AddVoucher";
import ListVoucher from "./pages/admin/Voucher/ListVoucher";
import UserProfile from "./pages/client/User/UserProfile";
import UserInfor from "./pages/client/User/UserInfor";
import UserAddress from "./pages/client/User/UserAddress";
import UserChangepass from "./pages/client/User/UserChangepass";
import UserOrderhistory from "./pages/client/User/UserOrderhistory";
import UserAnnouncement from "./pages/client/User/UserAnnouncement";
import Payment from "./pages/client/payment";
import UserOrderhistorydetail from "./pages/client/User/UserOrderhistorydetail";
import ProductContext from "./contexts/productContext";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ColorContext>
              <SizeContext>
                <OrderContext>
                  <CategoryContext>
                    <ProductContext>
                      <LayoutClient />
                    </ProductContext>
                  </CategoryContext>
                </OrderContext>
              </SizeContext>
            </ColorContext>
          }
        >
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthForm isLogin />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/mail" element={<Mail />} />
          <Route path="" element />
          <Route path="" element />
          <Route path="/profile" element={<UserProfile />}>
            <Route path="/profile/userinfo" element={<UserInfor />} />
            <Route path="/profile/address" element={<UserAddress />} />
            <Route
              path="/profile/change-password"
              element={<UserChangepass />}
            />
            <Route
              path="/profile/order-history"
              element={<UserOrderhistory />}
            />
            <Route
              path="/profile/order-detail/:id"
              element={<UserOrderhistorydetail />}
            />
            <Route
              path="/profile/announcement"
              element={<UserAnnouncement />}
            />
          </Route>
        </Route>
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProductContext>
              <SizeContext>
                <ColorContext>
                  <CategoryContext>
                    <PrivateAdmin element={<LayoutAdmin />} />
                  </CategoryContext>
                </ColorContext>
              </SizeContext>
            </ProductContext>
          }
        >
          <Route path="/admin" index element={<Dashboard />} />
          <Route path="/admin/product" element={<ListProduct />} />
          <Route path="/admin/product-add" element={<AddProducts />} />
          <Route path="/admin/product-edit/:id" element={<EditProduct />} />
          <Route path="/admin/category" element={<ListCategory />} />
          <Route path="/admin/category-add" element={<AddCategory />} />
          <Route path="/admin/category-edit/:id" element={<UpdateCategory />} />
          <Route path="/admin/category-add" element={<AddCategory />} />
          <Route path="/admin/category-edit/:id" element={<UpdateCategory />} />
          <Route path="/admin/color" element={<ListColor />} />
          <Route path="/admin/color-add" element={<AddColor />} />
          <Route path="/admin/color-edit/:id" element={<UpdateColor />} />
          <Route path="/admin/size" element={<ListSize />} />
          <Route path="/admin/size-add" element={<AddSize />} />
          <Route path="/admin/size-edit/:id" element={<UpdateSize />} />
          <Route path="/admin/size-edit/:id" element={<UpdateColor />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/user" element={<ListUser />} />
          <Route path="/admin/vouchers" element={<ListVoucher />} />
          <Route path="/admin/voucher-add" element={<AddVoucher />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
