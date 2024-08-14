import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./CompleteRemovePopup.css";
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from "moment";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
//import { truncate } from "node:fs";
import Popup from 'reactjs-popup';

export default function CompleteRemovePopup(props: any) {
    const { t } = useTranslation() 
    const [data, setData] = useState("correct")

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
                <h3 className="font-bold text-gray-600 text-xl mt-15 p-5">{t("Interest offer removed")}</h3>
            </div>
        )
    }
  
    return (
        <div className="bg-white rounded-lg modal centerItems">
            {whatToShow()}
        </div>
    )
}