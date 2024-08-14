import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./ConfirmDataPopup.css";
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from "moment";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";



export default function ConfirmDataPopup(props: any) {
    const { t } = useTranslation() 

    function handleClick() {
        props.toggle();
    };

    const containerStyles = {
        maxWidth: 400,
    };

    function whatToShow() {
        return (
            <div>
                <h3 className="font-bold text-gray-600 text-xl m-5 p-5">{t("Confirmation of data complete")}</h3>
                <p className="max-h-80 overflow-auto text-gray-600 ml-40 mr-20">{t("All data are correct")}</p>
            </div>
        )  
    }
  
    return (
        <div className="bg-white rounded-lg modal center">
            {whatToShow()}
        </div>
    )
}