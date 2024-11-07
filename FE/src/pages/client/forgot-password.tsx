import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {};

const ForgotPassword = (props: Props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8000/api/forget-password", data);
      alert("Thanh cong");
      navigate("reset-password");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Vui long dien mail</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Email</label>
        <input type="text" {...register("email")} />
        <button type="submit">Gui</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
