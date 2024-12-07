import React, { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Category, formDataCategory } from "../interfaces/Category";
import {
  addCategory,
  GetCategories,
  removeCategory,
  updateCategory,
} from "../services/admin/category";
import { GetCategoriesClient } from "../services/client/category";

type Props = {
  children: React.ReactNode;
};
export const CategoryCT = createContext({} as any);
const CategoryContext = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesClient, setCategoriesClient] = useState<Category[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await GetCategories();
      setCategories(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const data = await GetCategoriesClient();
      setCategoriesClient(data);
    })();
  }, []);

  const onRemoveCategory = async (id: number | string) => {
    const confirm = window.confirm("Xoa ?");
    if (confirm) {
      try {
        await removeCategory(id);
        alert("Thanh cong");
        const newCategoriesAfterDelete = categories.filter(
          (category) => category.id !== id
        );
        setCategories(newCategoriesAfterDelete);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onAddCategory = async (data: formDataCategory) => {
    try {
      const category = await addCategory(data);
      alert("Thanh cong");
      setCategories([...categories, category]);
      router("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateCategory = async (
    data: formDataCategory,
    id: number | string
  ) => {
    try {
      const product = await updateCategory(data, id);
      alert("Thanh cong");
      const newCategoriesAfterUpdate = categories.map((cate) =>
        cate.id == id ? product : cate
      );
      setCategories(newCategoriesAfterUpdate);
      router("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryCT.Provider
      value={{
        categories,
        onRemoveCategory,
        onAddCategory,
        onUpdateCategory,
        categoriesClient,
      }}
    >
      {children}
    </CategoryCT.Provider>
  );
};

export default CategoryContext;
