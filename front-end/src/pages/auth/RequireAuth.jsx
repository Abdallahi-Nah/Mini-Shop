import React, { useContext } from "react";
import { User } from "../../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const user = useContext(User);
  const location = useLocation();
  console.log(location);
  return user.auth.token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
};

export default RequireAuth;
