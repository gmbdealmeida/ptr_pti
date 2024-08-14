import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./CloseServicePopup.css";
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from "moment";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
import { useForm } from "react-hook-form";



export default function CloseServicePopup(props: any) {
    const { t } = useTranslation() 
    const { handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log("HELLO")
        // closeService(data)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    };

    // function completeRegister(data: any) {
    //     let promise = new Promise((resolve, reject) => {
    //         UpdateUser(data?.accountType, data?.name, data?.birthday, data?.bankAccount, data?.phone)
    //             .then( res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 reject(err)
    //             })
    //     })
    //     return promise;
    // }

    const containerStyles = {
        maxWidth: 400,
    };

    function whatToShow() {
        return (
            <div>
                <h3 className="font-bold text-gray-600 text-xl m-5 p-5">{t("AddcloseService")}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="labelH text-lg">{t("typeCloseService")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                    />
                    <label className="labelH text-lg">{t("distance")}:</label>
                    <input
                        className="inputBar"
                        type="text"
                    />
                    <button className="completeBtn items-center font-semibold" type="submit">{t("complete")}</button>
                </form>
            
            </div>
        )
    }
  
    return (
        <div className="bg-white rounded-lg modal center">
            {whatToShow()}
        </div>
    )
}