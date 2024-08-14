import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./page-under-construction.css";
import blackLogo from "../../assets/logoBlack.png";

import { useTranslation } from "react-i18next";
import i18n from "../../i18nextConf";

export default function PageUnderConstruction() {
    const { t } = useTranslation();

    return (
        <div className="loginPage bg-main flex justify-center text-center">
            <Link to="/">
          <div className="md:w-3/6 m-auto">
            
        
                <div className="content-center inline-block pt-20 pb-20">
                  <img
                    className="min-h-3000 w-auto"
                    src={blackLogo}
                    alt="Logo"
                  />
                 
                </div>
               
            
            </div>
            <h1 className="font-mono text-7xl pb-20">
            {t("page-under-construction")}
            </h1>
          
            <button
                type="submit"
                className="min-w-full block mt-12 text-white bg-dark_blue font-bold text-2xl rounded-full pt-1 pb-2 focus:outline-none hover:bg-opacity-80 hover:bg-salmon hover:text-darker_blue"
              >
                {t("go-to-homepage")}
              </button>
         
            </Link>
            </div>
      );
    }
