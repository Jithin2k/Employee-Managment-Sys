import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";
import ViewUser from "./components/ViewUser";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddUser/>
            </PrivateRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <ViewUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
