import React from "react";
import { Form, message } from "antd"; //Can read about  form documents in antd doc/
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      let userDetails = {
        email: userEmail,
        password: userPass,
      };
      dispatch(ShowLoading());
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        userDetails
      );
      dispatch(HideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("token", res.data.data);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-screen">
      <div className="w-screen p-3 card">
        <h1 className="text-xl">Safar - Log in</h1>
        <hr />
        <Form layout="vertical">
          {/** on finish is a antd predefined function */}
          <Form.Item label="Email">
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password">
            <input
              type="password"
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
            />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register">
              <b>Click Here to Register!</b>
            </Link>
            <button className="secondary-btn" onClick={onSubmit}>
              Log in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
