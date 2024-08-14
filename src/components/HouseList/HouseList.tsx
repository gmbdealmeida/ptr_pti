import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from 'moment';

import "./HouseList.css";

import FavPopup from "../FavPopup/FavPopup";

import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { BsBookmarkFill, BsBookmarkPlus, BsPeople } from "react-icons/bs";
import { IoBedOutline, IoSnowOutline } from "react-icons/io5";
import { BiBath, BiWifi, BiMap } from "react-icons/bi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { RiTempHotLine } from "react-icons/ri";
import { GiForkKnifeSpoon } from "react-icons/gi";

function HouseList(props: any) {
    const { t } = useTranslation();
    const [favourite, setFavourite] = useState(false);
    const [interest, setInterest] = useState(false);
    const [seen, setSeen] = useState(false);
    const [available, setAvailable] = useState("");

    function dateAvailable(dateEnd: string) {
        var date = new Date(dateEnd);
        var today = new Date();
        var todayString;
        var dateString;
        today.setDate(today.getDate());

        todayString =
            today.getFullYear() +
            "-" +
            ("0" + (today.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + today.getDate()).slice(-2);

        dateString =
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2);


        if (moment(dateString).isAfter(todayString)) {

            //setAvailable(dateString);
            return (
                <p className="text-red-500 text-sm">Occupied until {dateString}</p>
            )
        } else {
            //console.log("Date was set")
            //setAvailable(todayString);
            return (
                <p className="text-green-500 text-sm">Available</p>
            )
        }
    }

    //mudar para a imagem principal de cada casa
    // esta linha será retirada

    function rating(num: number) {
        const max = 5
        const filled = num
        const notFilled = max - num
        const stars = []
        let iKey = 0;

        for (let i = 0; i < filled; i++) {
            stars.push(
                <svg className="mx-1 w-4 h-4 sm:w-4 md:w-6 lg:w-6 xl:w-6 sm:h-4 md:h-6 lg:h-6 xl:h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" key={props.id*5 + iKey}><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            )
            iKey++;
        }

        for (let i = 0; i < notFilled; i++) {
            stars.push(
                <svg className="mx-1 w-4 h-4 sm:w-4 md:w-6 lg:w-6 xl:w-6 sm:h-4 md:h-6 lg:h-6 xl:h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" key={props.id*5 + iKey}><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            )
            iKey++;
        }
        return (
                stars  
        )
    }

    function commodities(com: any) {
        const commodities = []
        for (const value of com) {
            if (value === "wifi") {commodities.push(<BiWifi className="inline" title={t("wifi")} key={"wifi"}/>)}
            if (value === "airConditioner") {commodities.push(<IoSnowOutline className="inline" title={t("airConditioner")} key={"airConditioner"}/>)}
            if (value === "heater") {commodities.push(<RiTempHotLine className="inline" title={t("heater")} key={"heater"}/>)}
            if (value === "dishWasher") {commodities.push(<GiForkKnifeSpoon className="inline" title={t("dishWasher")} key={"dishWasher"}/>)}
            if (value === "washingMachine") {commodities.push(<CgSmartHomeWashMachine className="inline" title={t("washingMachine")} key={"washingMachine"}/>)}
        }
        return (
            commodities
        )
    }

    return (
        <div className="container mt-1 mb-2 mx-auto w-3/4">
            <article className="overflow-hidden rounded-lg shadow-lg">

                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-2xl font-semibold">
                        <Link to={'/house?id=' + props.id} >
                            <p
                                className="no-underline hover:underline text-dark_blue font-bold text-lg visited:text-purple-600"
                            >
                                {props.name}
                            </p></Link>
                    </h1>
                    {dateAvailable(props.dateAvailable)}
                </header>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 ">
                    <div>
                        <a href="#">
                            <img
                                className="block max-h-74 max-w-48"
                                alt="Placeholder"
                                src={props.pictures[0]}
                            />
                        </a>
                    </div>
                    <div className=" sm:h-30 md:h-30 lg:h-30 xl:h-30 grid grid-rows-4 gap-0">
                        <div className="mb-4">
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">
                                {props.houseType}
                            </p>
                        </div>
                        <div>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                                {props.roomsNum} <IoBedOutline className={"inline"} title={t("room")} /> {props.maxPeopleNum} <BsPeople className="inline" title={t("people")} />
                            </p>
                        </div>                        
                        <div className="mb-4">
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">{t("rentalPrice")}</p>
                        </div>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">{props.rent}€/{t("month")}</p>
                        <div className="mb-4">
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">{t("commodities")}</p>
                        </div>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                                {commodities(props.commodities)}
                            </p>
                        <div>
                            <div className="flex float-right">
                                <div className="flex items-center float-right mb-4">
                                {rating(props.rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="flex items-center justify-between leading-none md:p-4">
                    <a
                        className="flex items-center no-underline hover:underline text-black"
                        href="#"
                    >
                        <BiMap className="h-8 w-8"/>
                        <p className="ml-2 text-base sm:text-sm md:text-md lg:text-lg xl:text-xl">{props.location}</p>
                    </a>

                    <div className="markBtn right-0.bottom-0">
                        <button className="w-6 h-auto focus:ring-0 focus:outline-none" onClick={() => setInterest(!interest)}>{interest ? <BsBookmarkFill size={24} color={'#F9C2A7'} /> : <BsBookmarkPlus size={24} />}</button>
                        <button className="w-6 h-auto ml-3 mr-4 focus:ring-0 focus:outline-none" onClick={() => { setFavourite(!favourite); (favourite ? setSeen(seen) : setSeen(!seen)); }}>{favourite ? <HiHeart size={24} color={'#EA5455'} /> : <HiOutlineHeart size={24} />}</button>
                        {favourite ? (seen ? <FavPopup toggle={() => setSeen(!seen)} lists={props.lists} /> : null)
                            : null
                        }
                    </div>
                </footer>
            </article>
        </div>
    )
}

export default HouseList