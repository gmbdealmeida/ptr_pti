import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./CancelPopup.css";
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from "moment";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
//import { truncate } from "node:fs";
import Popup from 'reactjs-popup';

export default function CancelPopup(props: any) {
    const { t } = useTranslation() 

    function handleClick() {
        console.log("CLICKED!")
        props.toggle();
    };

    function handleChange(event: any) {
        console.log("IM HERE! " + event.target.value)
    }


    const containerStyles = {
        maxWidth: 400,
    };

    function whatToShow() {
        return (
            <div>
                <h3 className="font-bold text-gray-600 text-xl mt-15 p-5">{t("Operation canceled by your choice")}</h3>
            </div>
        )
    }
  
    return (
        <div className="bg-white rounded-lg modal centerItems">
            {whatToShow()}
        </div>
    )
}