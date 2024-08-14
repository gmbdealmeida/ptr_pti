import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "../../components/RemoveInterestPopup/RemoveInterestPopup.css";
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from "moment";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
//import { truncate } from "node:fs";
import Popup from 'reactjs-popup';
import CompleteRemove from "../../components/CompleteRemovePopup/CompleteRemovePopup";
import Cancel from "../../components/CancelPopup/CancelPopup";

export default function RemoveInterestPopup(props: any) {
    const { t } = useTranslation() 
    const [data, setData] = useState("correct")
    const [show, setShow] = useState(true)
    const [position, setPosition] = useState("none")
    
    function handleClick() {
        console.log("CLICKED!")
        props.toggle();
    };

    function handleChange(event: any) {
        console.log("IM HERE! " + event.target.value)
    }

    function getOut() {
        setShow(false)
        setPosition("relative")
    }

    const containerStyles = {
        maxWidth: 400,
    };


    function whatToShow() {
        return (
            <div className="bg-white rounded-lg modal center m-5">
                <h3 className="font-bold text-gray-600 text-xl m-5 p-5">{t("Are you sure you want to remove this interest?")}</h3>
                <div className="mb-10">
                    <button type="button">
                        <div>
                            <Popup
                                trigger={<button className={'yesBtn font-semibold ml-4'} type={'button'}>Yes</button>}
                                modal
                                nested
                                position="top center"
                            >
                                <CompleteRemove />
                            </Popup>
                        </div>
                    </button>
                    <button type="button">
                        <div>
                            <Popup
                                trigger={<button className={'cancelBtn font-semibold ml-4'} type={'button'}>Cancel</button>}
                                modal
                                nested
                                position="top center"
                            >
                                <Cancel />
                            </Popup>
                        </div>
                    </button>
                </div>
            </div>
        )
    }
  
    return (
        <div>
            {whatToShow()}
        </div>
    )
}