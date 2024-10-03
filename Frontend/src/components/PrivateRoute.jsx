import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import DefaultLayout from "./DefaultLayout";

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      dispatch(HideLoading());
      navigate("/login");
    }
  }, []);
  const validateToken = async () => {
    try {
      dispatch(ShowLoading());
      const res = await axios.post(
        "http://localhost:3000/api/users/get-user-by-id",
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (res.data.success) {
        dispatch(SetUser(res.data.data));
      } else {
        localStorage.removeItem("token");
        message.error(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      navigate("/login");
    }
  };
  return (
    <div>
      <>
        <DefaultLayout>{children}</DefaultLayout>
      </>
    </div>
  );
}

export default PrivateRoute;
