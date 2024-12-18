import { createContext, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../services/admin/product";
import { getProductsClients } from "../services/client/product";

type Props = {
  children: React.ReactNode;
};
export const ProductCT = createContext({} as any);
const ProductContext = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsClient, setProductsClient] = useState<Product[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const data = await getProductsClients();
      setProductsClient(data);
    })();
  }, []);
  const onRemoveProduct = async (id: number | string) => {
    const confirm = window.confirm("Xoa ?");
    if (confirm) {
      try {
        await removeProduct(id);
        toast.success("Xóa sản phẩm thành công ");
        const newProductsAfterDelete = products.filter(
          (product) => product.id !== id
        );
        setProducts(newProductsAfterDelete);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onAddProduct = async (data: Product) => {
    try {
      const product = await addProduct(data);
      setProducts([...products, product]);
      router("/admin/product");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateProduct = async (data: Product, id: number) => {
    try {
      console.log("o ham update", data);
      const product = await updateProduct(data, id);
      const newProductsAfterUpdate = products.map((pro) =>
        pro.id == id ? product : pro
      );
      setProducts(newProductsAfterUpdate);
      router("/admin/product");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ProductCT.Provider
        value={{
          setProducts,
          productsClient,
          setProductsClient,
          onAddProduct,
          onRemoveProduct,
          onUpdateProduct,
          products,
        }}
      >
        {children}
      </ProductCT.Provider>
    </div>
  );
};

export default ProductContext;
