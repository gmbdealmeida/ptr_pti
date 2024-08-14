import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ReceiptPopup.css";
import { Link } from "react-router-dom";
import moment from "moment";

export default function ReceiptPopup(props: any){

    const { t } = useTranslation()

    const[date, setDate] = useState("")

    useEffect(() => {
        let today = moment()
        setDate(today.format("LLLL"))
    }, [])
    
    function whatToShow(){
        if (props.t == "creditCard"){
            return (
                <div className="bg-white">
                    <h1 className="text-dark_blue text-3xl">UHOME</h1>
                    <h1 className="text-xl">{t("receipt")}</h1>
                    <hr />
                    <p>{t("date")}: {date}</p>
                    <br/>
                    <p>{t("amount")}: {props.rent}€</p>
                    <br/>
                    <p>{t("credit")}: {props.card}</p>
                    <br/>
                    <p>{t("by")}: {JSON.parse(localStorage.getItem("userData") as string).name}</p>
                    <br/>
                    <p>{t("for")}: {props.title}</p>
                    <br/>
                    <p>{t("To")}: {props.name}</p>
                    <br/>
                    <p>{t("address")}: {props.address}, {props.zip}, {props.city}</p>
                    <br/>
                    <p>{t("problems")}</p>
                    <br/>
                    <p>{t("customer")}</p>
                </div>
            )
        }else if (props.t == "bankTransfer"){
            return(
                <div >
                    <h1 className="text-dark_blue text-3xl">UHOME</h1>
                    <h1 className="text-xl">{t("receipt")}</h1>
                    <hr />
                    <p>{t("date")}: {date}</p>
                    <br/>
                    <p>{t("amount")}: {props.rent}€</p>
                    <br/>
                    <p>{t("entity")}: {props.entity}</p>
                    <br/>
                    <p>{t("reference")}: {props.reference}</p>
                    <br/>
                    <p>{t("by")}: {JSON.parse(localStorage.getItem("userData") as string).name}</p>
                    <br/>
                    <p>{t("for")}: {props.title}</p>
                    <br/>
                    <p>{t("To")}: {props.name}</p>
                    <br/>
                    <p>{t("address")}: {props.address}, {props.zip}, {props.city}</p>
                    <br/>
                    <p>{t("days")} </p>
                    <br/>
                    <p>{t("problems")}</p>
                    <br/>
                    <p>{t("customer")}</p>
                </div>
            )
        }
    }

    
    return(
        <div className="bg-white rounded-lg modalBook centerBook">

            {whatToShow()}
            
            <button onClick={() => window.print()} id="hide" className="finBtn inline-block" type="button" >{t("print")}</button>
            <Link to="/successfulPayment">
                    <button className="inline finBtn" id="hide" type="button" >{t("finish")}</button>
            </Link>
        </div>
    )
}