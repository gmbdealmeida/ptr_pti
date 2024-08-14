import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from 'moment';

import "./ServiceList.css";

import FavPopup from "../FavPopup/FavPopup";

import { MdTimer, MdTimerOff} from "react-icons/md";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"; 

export default function ServiceList(props: any) {
    const { t } = useTranslation();
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

    //mudar para a imagem principal de cada serviço
    // esta linha será retirada
    var imagem = "https://picsum.photos/600/400/?random";

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

    function daysOff(com: any) {
        const daysOff = []
        if (com.length === 0){
            daysOff.push(<p className="inline mr-1 font-semibold" key={"none"}>{t("none")}</p>)
        }else{
            if (com.includes("monday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("monday")} key={"monday"}>{t("m")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("monday")} key={"monday"}>{t("m")}</p>)}
            if (com.includes("tuesday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("tuesday")} key={"tuesday"}>{t("t")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("tuesday")} key={"tuesday"}>{t("t")}</p>)}
            if (com.includes("wednesday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("wednesday")} key={"wednesday"}>{t("w")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("wednesday")} key={"wednesday"}>{t("w")}</p>)}
            if (com.includes("thursday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("thursday")} key={"thursday"}>{t("th")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("thursday")} key={"thursday"}>{t("th")}</p>)}
            if (com.includes("friday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("friday")} key={"friday"}>{t("f")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("friday")} key={"friday"}>{t("f")}</p>)}
            if (com.includes("saturday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("saturday")} key={"saturday"}>{t("sat")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("saturday")} key={"saturday"}>{t("sat")}</p>)}
            if (com.includes("sunday")) {daysOff.push(<p className="inline mr-1 text-red-400 font-semibold" title={t("sunday")} key={"sunday"}>{t("s")}</p>)}
            else {daysOff.push(<p className="inline mr-1" title={t("sunday")} key={"sunday"}>{t("s")}</p>)}
         }
        return (
            daysOff
        )
    }

    return (
        <div className="container mt-1 mb-2 mx-auto w-3/4">
            <article className="overflow-hidden rounded-lg shadow-lg">

                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-2xl font-semibold">
                        {/* REMOVE STATE WHEN DB IS SET ON SERVICE.TSX */}
                        <Link to={{
                            pathname: '/service', state: {
                                id: props.id,
                                title: props.title,
                                price: props.price,
                                place: props.location,
                                availableDate: props.dateAvailable,
                                maxHourDay: props.maxHourDay,
                                minHourDay: props.minHourDay,
                                serviceType: props.serviceType,
                                daysOff: props.daysOff,
                                description: "When be draw drew ye. Defective in do recommend suffering. House it seven in spoil tiled court. Sister others marked fat missed did out use. Alteration possession dispatched collecting instrument travelling he or on. Snug give made at spot or late that mr. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are. Had strictly mrs handsome mistaken cheerful. We it so if resolution invitation remarkably unpleasant conviction. As into ye then form. To easy five less if rose were. Now set offended own out required entirely. ",//props.description,
                                listOfImages: props.listOfImages,
                                providerName: props.providerName,
                                rating: props.rating,


                            }
                        }} >
                            <p
                                className="no-underline hover:underline text-dark_blue font-bold text-lg visited:text-purple-600"
                            >
                                {props.title}
                            </p></Link>
                    </h1>
                    {dateAvailable(props.dateAvailable)}
                </header>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 ">
                    <div>
                        <a href="#">
                            <img
                                className="block max-h-64 max-w-48"
                                alt="Placeholder"
                                src={imagem}
                            />
                        </a>
                    </div>
                    <div className=" sm:h-30 md:h-30 lg:h-30 xl:h-30 grid grid-rows-4 gap-0">
                    <div>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">
                                {props.serviceType}
                            </p>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                                {props.location}
                            </p>
                        </div>
                        <div>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">{t("priceHour")}</p>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">{props.price}€/{t("hour")}</p>
                        </div>
                        <div>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">{t("daysOff")}</p>
                            <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl">
                                {daysOff(props.daysOff)}
                            </p>
                        </div>
                        <div className="">
                            <div className="flex float-right">
                                <div className="flex items-center float-right mb-4">
                                {rating(props.rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </article>
        </div>
    )
}