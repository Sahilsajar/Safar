// import "./App.css";
import React from "react";
import "./resources/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBooking from "./pages/admin/AdminBooking";
import AdminBus from "./pages/admin/AdminBus";
import AdminHome from "./pages/admin/AdminHome";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoute from "./components/PrivateRoute";
import DefaultLayout from "./components/DefaultLayout";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Spinner></Spinner>}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <AdminUsers />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin/bookings"
            element={
              <PrivateRoute>
                <AdminBooking />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin/bus"
            element={
              <PrivateRoute>
                <AdminBus />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/admin/Home"
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
