import { createContext, useEffect, useState } from "react";
import { FormProductData, Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../services/product";

type Props = {
  children: React.ReactNode;
};
export const ProductCT = createContext({} as any);
const ProductContext = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const onRemoveProduct = async (id: number | string) => {
    const confirm = window.confirm("Xoa ?");
    if (confirm) {
      try {
        await removeProduct(id);
        alert("Thanh cong");
        const newProductsAfterDelete = products.filter(
          (product) => product.id !== id
        );
        setProducts(newProductsAfterDelete);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onAddProduct = async (data: FormProductData) => {
    try {
      const product = await addProduct(data);

      setProducts([...products, product]);
      router("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateProduct = async (
    data: FormProductData,
    id: number | string
  ) => {
    try {
      const product = await updateProduct(data, id);
      alert("Thanh cong");
      const newProductsAfterUpdate = products.map((pro) =>
        pro.id == id ? product : pro
      );
      setProducts(newProductsAfterUpdate);
      router("/admin/product");
    } catch (error) {}
  };
  return (
    <div>
      <ProductCT.Provider
        value={{ onAddProduct, onRemoveProduct, onUpdateProduct, products }}
      >
        {children}
      </ProductCT.Provider>
    </div>
  );
};

export default ProductContext;
