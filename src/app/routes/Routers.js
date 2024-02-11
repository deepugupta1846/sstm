import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../../Components/Pages/Login";
import Signup from "../../Components/Pages/Signup";
import Dashboard from "../../Components/Pages/Dashboard";
import CompaniesList from "../../Components/Pages/CompaniesList";
import AuthService from "../../api/auth/AuthService";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:update_id" element={<Dashboard />} />
        <Route path="/companies-list" element={<CompaniesList />} />
      </Routes>
    </>
  );
}
export default Routers;
