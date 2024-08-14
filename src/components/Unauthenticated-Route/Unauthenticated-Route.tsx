import React, { useState } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import querystring from "../../_services/helper";

interface IProps {
    children: any,
    path: string,
    exact: boolean | undefined
}

/*
Se um utilizador se autenticar será redirecionado para a home
*/
export default function UnauthenticatedRoute({ children, ...rest }: IProps) {
  const redirect = querystring("redirect", false)
  const isAuth = localStorage.getItem("authenticated")
  const isAuthBool = isAuth === 'true' ? true : false
    return (
        <Route {...rest}>
          {!isAuthBool ? (
            children
          ) : (
            <Redirect to={redirect === "" || redirect === null ? "/home" : redirect}/>
          )}
        </Route>
      );
}