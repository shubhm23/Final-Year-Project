import { useLocation, Navigate } from "react-router-dom";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const RequireToken = ({ children }) => {
  let token = getToken();
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
