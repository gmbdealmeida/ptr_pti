import React, { useState } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import isAuthenticated from "../../_services/Authenticator";

interface IProps {
    children: any,
    path: string,
    exact: boolean | undefined
}

/*
Se um utilizador se autenticar será redirecionado para o search
*/
export default function AuthenticatedRoute({ children, ...rest }: IProps) {
  const { pathname, search } = useLocation();
  isAuthenticated()
  const isAuth = localStorage.getItem("authenticated")
  const isAuthBool = isAuth === 'true' ? true : false
  return (
    <Route {...rest}>
      {isAuthBool ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}