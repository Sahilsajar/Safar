import React from "react";
import { Form, message } from "antd"; //Can read about  form documents in antd doc/
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const dispatch = useDispatch();
  const onSubmit = async () => {
    try {
      let userDetails = {
        name: userName,
        email: userEmail,
        password: userPass,
      };
      dispatch(ShowLoading());
      const res = await axios.post(
        "http://localhost:3000/api/users/register",
        userDetails
      );
      dispatch(HideLoading());
      // console.log(res);

      if (res.data.success) {
        message.success(res.data.message);
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
        <h1 className="text-xl">Safar - Register</h1>
        <hr />
        <Form layout="vertical">
          {/** on finish is a antd predefined function */}
          <Form.Item label="Name">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
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
            <Link to="/login">
              <b>Click Here to Login!</b>
            </Link>
            <button className="secondary-btn" onClick={onSubmit}>
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
