import { ReactNode, useContext } from "react";
import { Navigate } from "react-router"
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoutes = ({children} : {children : ReactNode}) => {

  const context = useContext(AuthContext);

  if(!context || !context.token) {
    return <Navigate to="/signup" />
  }

  return children;
}