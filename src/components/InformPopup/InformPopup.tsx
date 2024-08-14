import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./InformPopup.css";
import EditHousePopup from "../../components/EditHousePopup/EditHousePopup";
import Popup from 'reactjs-popup';



export default function InformPopup(props: any) {
    const { t } = useTranslation() 

    function handleClick() {
        props.toggle();
    };

    const containerStyles = {
        maxWidth: 400,
    };
    
    function missingAttr() {
        return (
            <div>
                {props.missing.filter((attr: any) => attr).map((filteredAttr: any) => (
                    <div>
                        <p className="font-bold text-gray-600 text-xl base">
                            {filteredAttr}
                        </p>
                    </div>
                ))}
            </div>
        )   
    }
  
    function whatToShow() {
        return (
            <div>
                <h3 className="font-bold text-gray-600 text-xl m-5 p-5">{t("Confirmation of data complete")}</h3>
                <p className="font-bold text-gray-600 text-base mb-5">{t("This offer is missing")}</p>
                    {missingAttr()}
                    <div className="absolute bottom-4 right-0 px-2 py-3"> 
                        <div>
                            <Popup
                                trigger={<button className={'rounded-lg py-2 px-1 text-white text-base bg-salmon hover:bg-red-700'}> {t("editHouse")} </button>}
                                modal
                                nested
                                position="top center"
                            >
                                <EditHousePopup houseId={props.houseId} />
                            </Popup>
                        </div>
                    </div>
            </div>
        )
    }
  
    return (
        <div className="bg-white rounded-lg modal1 center1">
            {whatToShow()}
        </div>
    )
}