import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./service.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../assets/svgs/search.svg";
import HousePicsSwiper from "../../components/HousePicsSwiper/HousePicsSwiper";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";
import moment from 'moment';

// import { pt, ptBR } from 'date-fns/locale'
// import { DateRangePicker} from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'

import { MdTimer, MdTimerOff} from "react-icons/md";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"; 
import { Popup } from "reactjs-popup";
import BookPopup from "../../components/BookPopup/BookPopup";

function Service() {

    const { t } = useTranslation();
    const [dots, setDots] = useState(true);
    const [dateAvailable, setDateAvailable] = useState({});
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const props = useLocation<any>()
    // fazer state true false para calender

    var imagem = "https://picsum.photos/600/400/?random";

    const listOfImages = [imagem, imagem, imagem, imagem, imagem]
    // DELETE THIS ^^ replace with api

    function search() {
        console.log("searching...")
    }

    function rating(num: number) {
        const max = 5
        const filled = num
        const notFilled = max - num
        const stars = []

        for (let i = 0; i < filled; i++) {
            stars.push(
                <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
            )
        }

        for (let i = 0; i < notFilled; i++) {
            stars.push(
                <svg className="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
            )
        }
        return (
            <div className="flex items-center">
                <div className="flex items-center mt-2 mb-4">
                    {stars}
                </div>
            </div>
        )
    }

    function longDescription(text: string){
        let visible = ""
        let invisible = ""
        if (text.length > 130){
            visible = text.substring(0,130)
            invisible = text.substring(130)
            return(
                <div className="sep text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                    <p>{visible}{dots ? "..." : invisible}</p>
                    <button onClick={() => {setDots(!dots)}} id="moreBtn" className="moreBtn">{dots ? t("readMore") : t("readLess")}{dots ? <IoIosArrowDropdown className="inline"/> : <IoIosArrowDropup className="inline"/>}</button>
                </div>
            )
        }
        else{
            return(
                <p className="sep text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                    {text}
                </p>
            )
            
        }
    }

    function daysOff(com: any) {
        const daysOff = []
        if (com.length === 0){
            daysOff.push(<p className="inline mr-1 font-semibold">{t("none")}</p>)
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

     function showToggleDatePicker(dateAvailable: string){
         console.log("Date picker clicked")
    
     }

    return (
        <div>
            <Navbar />
            <div className="container mt-5 mb-2 mx-auto w-3/4">
                <article className="overflow-hidden rounded-lg shadow-lg">
                    <HousePicsSwiper pics={listOfImages} />
                    <div className="ml-5 mr-5 mt-3">

                        <h1 className="text-base xs:text-xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl font-semibold w-3/4">
                            {props.state.title}
                        </h1>

                        <a
                            className="flex items-center no-underline hover:underline text-black"
                            href="#"
                        >
                            <img
                                alt="Placeholder"
                                className="block rounded-full mt-2"
                                src="https://picsum.photos/32/32/?random"
                            />
                            <p className="ml-2">{props.state.providerName}</p>
                        </a>
                        <div className="grid grid-cols-2 gap-2 ml-5 mr-5 mt-3">
                            <div>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold  mt-2 text-salmon">
                                {props.state.serviceType} {t("doneBy")} {props.state.providerName}
                                </p>
                                
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">{t("priceHour")}</p>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">{props.state.price}€/{t("hour")}</p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">{t("maxMin")}</p>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {props.state.minHourDay} <MdTimer className={"inline"} title={t("minHourDay")} />   {props.state.maxHourDay} <MdTimerOff className={"inline text-red-400"} title={t("maxHourDay")} />
                                </p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">{t("daysOff")}</p>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {daysOff(props.state.daysOff)}
                                </p>

                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">{t("rating")}</p>
                                <div className="text-base xs:text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs mt-1">
                                    {rating(props.state.rating)}
                                </div>
                            </div>
                            <div>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">{t("description")}</p>
                                {longDescription(props.state.description)}

                                <div className="mt-2">
                                    <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1 inline font-semibold">{t("location")}: </p>
                                    <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1 inline ">{props.state.place}</p>
                                </div>
                                <img
                                className="block w-1/3 mt-2 mb-5"
                                src="https://picsum.photos/100/100/?random"
                                />
                                
                                
                                
                            </div>
                        </div>
                    </div>
                    <footer>
                        <button onClick={() => showToggleDatePicker(props.state.availableDate)} className="bookBtn items-center float-left font-semibold ml-4" type="button">{t("chooseDates")}</button>
                        <Popup 
                            modal
                            trigger={<button className="bookBtn items-center float-left font-semibold ml-4" type="button">{t("hire")}</button>}
                            position="top center"
                        
                        >
                            <BookPopup price={props.state.price} /> 
                        </Popup>
                    </footer>
                </article>
            </div>
            <div className="fixed bottom-0 right-0 z-50">
                <Chat/>
            </div>
            <Footer/>
        </div>
    )
}

export default Service

