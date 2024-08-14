import React, { useEffect } from 'react'
import Select from "react-select";
import i18next from "i18next";
import "./Language-Changer.css";


export default function LanguageChanger(props: any) {
  const options = [
    { value: "pt", label: "Português" },
    { value: "en", label: "English" },
  ];

  /*
  Variáveis:
  0: português
  1: inglês
  */
  var optionNumber = localStorage.getItem("i18nextLng") === 'pt' ? 0 : 1; 

  function changeLanguage(e: any) {
    i18next.changeLanguage(e.value)
  }

  // removes the weird borders around React-Select 
  // and different styles for mobile and desktop
  const mobileStyles = {
    control: (base: any) => ({
      ...base,
      borderWidth: "0px",
      boxShadow: "none",
      backgroundColor: "#2D4059",
      borderRadius: "0.375rem",
      cursor: "pointer"
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white"
    }),
    valueContainer: (base: any) => ({
      ...base,
      justifyContent: "center",
      paddingLeft: "45px",
      fontWeight: "bold"
    }),
    menuList: (base: any) => ({
      ...base,
      backgroundColor: "#2D4059",
      color: "white",
      textAlign:"center",
      fontWeight: "bold",
      borderRadius: "0.375rem"
    }),
    option : (base: any, {isSelected}: any) => ({
      ...base,
      ":hover": {
        backgroundColor: "#1F2D3E"
      },
      backgroundColor: isSelected ? "#1F2D3E" : "#2D4059",
      cursor: "pointer"
    })
  }
  const desktopStyles = {
    control: (base: any) => ({
      ...base,
      borderWidth: "0px",
      boxShadow: "none",
      backgroundColor: "#2D4059",
      borderRadius: "0.375rem",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#1F2D3E"
      }
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white"
    }),
    valueContainer: (base: any) => ({
      ...base,
      paddingLeft: "10px",
      fontWeight: "bold"
    }),
    menuList: (base: any) => ({
      ...base,
      backgroundColor: "#2D4059",
      color: "white",
      fontWeight: "bold",
      borderRadius: "0.375rem"
    }),
    option : (base: any, {isSelected}: any) => ({
      ...base,
      ":hover": {
        backgroundColor: "#1F2D3E"
      },
      backgroundColor: isSelected ? "#1F2D3E" : "#2D4059",
      cursor: "pointer"
    })
  }
  
  return (
    <Select
      defaultValue={options[optionNumber]}
      isSearchable={false}
      onChange={changeLanguage}
      className={`shadow-none`}
      options={options}
      id="languageSelector"
      styles={props.mobile ? mobileStyles : desktopStyles}
    />
  );
}
