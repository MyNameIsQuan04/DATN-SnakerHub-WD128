import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const ResetPassword = (props: Props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8000/api/reset-password/");
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Nhap mat khau moi</label>
        <input type="text" {...register("password")} />
        <label htmlFor="">Nhap lai mat khau moi</label>
        <input type="text" {...register("password_confirmation")} />
        <button type="submit">Gui</button>
      </form>
    </div>
  );
};

export default ResetPassword;
