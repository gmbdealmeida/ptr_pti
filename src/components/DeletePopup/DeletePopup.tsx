import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./DeletePopup.css";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteHouseById } from "../../_services/api";

export default function DeletePopup(props: any){
    const { t } = useTranslation();

    let type = "canDelete"

    if (true){ 
        type = "cantDelete"
    }

    function deleteHouse(){
        DeleteHouseById(props.houseId)
            .then((res => {

            }))
            .catch(err => {
                console.log(err)
            })
    }

    function whatToShow(){
        if (type == "canDelete"){
            return(
                <div>
                    <h3 className="font-bold text-dark_blue text-xl p-5">{t("wantToDelete")}</h3>
                    <button 
                        
                        className="contBtn float-right m-2" 
                        type="submit" 
                    >
                        {t("no")}
                    </button>
                    <button 
                        onClick={() => deleteHouse} 
                        className="contBtn float-left m-2" 
                        type="submit" 
                    >
                        {t("yes")}
                    </button>

                </div>
            )
        }else{
            return(
                <div>
                    <h3 className="font-bold text-dark_blue text-xl p-5">{t("cantDelete")}</h3>
                    <button 
                        
                        className="contBtn float-right m-2" 
                        type="submit" 
                    >
                        {t("back")}
                    </button>

                </div> 
            )
        }

    }

    return(
        <div className="bg-white rounded-lg modalBook centerBook">
            {whatToShow()}
        </div>
    )
}