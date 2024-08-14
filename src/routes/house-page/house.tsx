import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./house.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../assets/svgs/search.svg";
import HousePicsSwiper from "../../components/HousePicsSwiper/HousePicsSwiper";
import FavPopup from "../../components/FavPopup/FavPopup";
import BookPopup from "../../components/BookPopup/BookPopup";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";

import { DatePicker } from "react-rainbow-components";

import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { BsBookmarkFill, BsBookmarkPlus, BsPeople } from "react-icons/bs";
import { IoBedOutline, IoSnowOutline, IoPawOutline } from "react-icons/io5";
import { BiBath, BiWifi } from "react-icons/bi";
import { CgSmartHomeWashMachine, CgGym } from "react-icons/cg";
import {
    RiTempHotLine,
    RiParkingBoxLine,
    RiMenLine,
    RiWomenLine,
} from "react-icons/ri";
import { GiForkKnifeSpoon, GiNightSleep, GiPartyPopper } from "react-icons/gi";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaSwimmingPool } from "react-icons/fa";
import { MdSmokingRooms } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import Popup from "reactjs-popup";
import { AddInterest, GetHouseById, GetInterestsByUserId, GetUserById, SendMessage } from "../../_services/api";
import CircleLoader from "react-spinners/CircleLoader";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import IsAuthenticated from "../../_services/Authenticator";

interface IHouse {
    address: string;
    area: number;
    closeServices: string;
    commodities: string;
    coordinates: string;
    created_at: string;
    dateAvailable: string;
    description: string;
    hostId: number;
    houseRules: string;
    houseType: string;
    id: number;
    installations: string;
    location: string;
    maxPeopleNum: number;
    pictures: string;
    rating: number;
    rent: number;
    roomsNum: number;
    spaceType: string;
    timesRated: number;
    title: string;
    updated_at: string;
    loading: boolean;
}

interface IHost {
    id: string;
    name: string;
    email: string;
    username: string;
    accountType: string;
    birthDate: string;
    bankAccountNumber: string; //retirar depois de dar update a k8s
    rating: string;
    timesRated: number;
    cellphoneNumber: string;
    address: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}
const libraries: (
    | "drawing"
    | "geometry"
    | "localContext"
    | "places"
    | "visualization"
)[] = ["places"];
const mapStyle = {
    height: "500px",
    width: "500px",
    marginTop: "50px"
};
function House(props: any) {
    const { t } = useTranslation();
    const [favourite, setFavourite] = useState(false);
    const [interest, setInterest] = useState(false);
    const [seen, setSeen] = useState(false);
    const [seenB, setSeenB] = useState(false);
    const [dots, setDots] = useState(true);
    const [dateAvailable, setDateAvailable] = useState({});
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [houseState, setHouseState] = useState<IHouse>();
    const [hostState, setHostState] = useState<IHost>();
    const [focused, setFocused] = useState({});
    const [loading, setLoading] = useState(true);
    const [messageSent, setMessageSent] = useState(false);
    const [imagem, setImagem] = useState<string[]>();
    const [center, setCenter] = useState<any>();
    // fazer state true false para calender

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE as string,
        libraries,
    });

    function rating(num: any) {
        const max = 5;
        const filled = num;
        const notFilled = max - num;
        const stars = [];

        for (let i = 0; i < filled; i++) {
            stars.push(
                <svg
                    className="mx-1 w-4 h-4 fill-current text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            );
        }

        for (let i = 0; i < notFilled; i++) {
            stars.push(
                <svg
                    className="mx-1 w-4 h-4 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
            );
        }
        return (
            <div className="flex items-center">
                <div className="flex items-center mt-2 mb-4">{stars}</div>
            </div>
        );
    }
    function addInterest() {
        console.log(houseState?.id.toString() as string)
        AddInterest(houseState?.id.toString() as string)
            .then((res) => {
                console.log(res)
                setInterest(!interest)
            })
            .catch(err => console.log(err))

    }
    function commodities(com: any) {
        if (com) {
            com = com.split(" ");
            if (com.length > 0) {
                const commodities = [];
                for (const value of com) {
                    if (value === "wifi") {
                        commodities.push(
                            <BiWifi className="inline mr-1" title={t("wifi")} />
                        );
                    }
                    if (value === "airConditioner") {
                        commodities.push(
                            <IoSnowOutline
                                className="inline mr-1"
                                title={t("airConditioner")}
                            />
                        );
                    }
                    if (value === "heater") {
                        commodities.push(
                            <RiTempHotLine
                                className="inline mr-1"
                                title={t("heater")}
                            />
                        );
                    }
                    if (value === "dishWasher") {
                        commodities.push(
                            <GiForkKnifeSpoon
                                className="inline mr-1"
                                title={t("dishWasher")}
                            />
                        );
                    }
                    if (value === "washingMachine") {
                        commodities.push(
                            <CgSmartHomeWashMachine
                                className="inline mr-1"
                                title={t("washingMachine")}
                            />
                        );
                    }
                }
                return commodities;
            }
        }
    }

    function installations(com: any) {
        if (com) {
            com = com.split(" ");
            if (com.length > 0) {
                const installations = [];
                for (const value of com) {
                    if (value === "parking") {
                        installations.push(
                            <RiParkingBoxLine
                                className="inline mr-1"
                                title={t("parking")}
                            />
                        );
                    }
                    if (value === "pool") {
                        installations.push(
                            <FaSwimmingPool
                                className="inline mr-1"
                                title={t("pool")}
                            />
                        );
                    }
                    if (value === "gym") {
                        installations.push(
                            <CgGym className="inline mr-1" title={t("gym")} />
                        );
                    }
                }
                return installations;
            }
        }
    }

    function houseRules(com: any) {
        if (com) {
            com = com.split(" ");
            if (com.length > 0) {
                const houseRules = [];
                for (const value of com) {
                    if (value === "onlyWomen") {
                        houseRules.push(
                            <RiWomenLine
                                className="inline mr-1"
                                title={t("onlyWomen")}
                            />
                        );
                    }
                    if (value === "onlyMen") {
                        houseRules.push(
                            <RiMenLine
                                className="inline mr-1"
                                title={t("onlyWomen")}
                            />
                        );
                    }
                    if (value === "smoking") {
                        houseRules.push(
                            <MdSmokingRooms
                                className="inline mr-1"
                                title={t("smoking")}
                            />
                        );
                    }
                    if (value === "pets") {
                        houseRules.push(
                            <IoPawOutline
                                className="inline mr-1"
                                title={t("pets")}
                            />
                        );
                    }
                    if (value === "sleepovers") {
                        houseRules.push(
                            <GiNightSleep
                                className="inline mr-1"
                                title={t("sleepovers")}
                            />
                        );
                    }
                    if (value === "parties") {
                        houseRules.push(
                            <GiPartyPopper
                                className="inline mr-1"
                                title={t("parties")}
                            />
                        );
                    }
                }
                return houseRules;
            }
        }
    }

    function longDescription(text: any) {
        if (text) {
            let visible = "";
            let invisible = "";
            if (text.length > 130) {
                visible = text.substring(0, 130);
                invisible = text.substring(130);
                return (
                    <div className="sep text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                        <p>
                            {visible}
                            {dots ? "..." : invisible}
                        </p>
                        <button
                            onClick={() => {
                                setDots(!dots);
                            }}
                            id="moreBtn"
                            className="moreBtn"
                        >
                            {dots ? t("readMore") : t("readLess")}
                            {dots ? (
                                <IoIosArrowDropdown className="inline" />
                            ) : (
                                <IoIosArrowDropup className="inline" />
                            )}
                        </button>
                    </div>
                );
            } else {
                return (
                    <p className="sep text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                        {text}
                    </p>
                );
            }
        }
    }

    function showToggleDatePicker(dateAvailable: string) {
        console.log("Date picker clicked");
    }

    function getHouse() {
        let id = window.location.search.substring(1).split("=");
        if (id[0] === "id") {
            GetHouseById(id[1])
                .then((res) => {
                    setHouseState(res.data.house as IHouse);
                    setCenter(JSON.parse(res.data.house.coordinates));
                    let imgArr = res.data.house.pictures.split(" ");
                    setImagem(imgArr);
                    GetUserById(res.data.house.hostId)
                        .then((hostData: any) => {
                            let userId = JSON.parse(localStorage.getItem("userData") as string).id
                            GetInterestsByUserId(userId)
                                .then(res => {
                                    for (let i = 0; i < res.data.interests.length; i++) {
                                        if(res.data.interests[i].idHouse == id[1]) {
                                            setInterest(true)
                                        }
                                    }
                                })
                                .catch(err => console.log(err))
                            setHostState(hostData.data.user as IHost);
                            setLoading(false);
                        })
                        .catch((err: any) => {
                            setLoading(false);
                            console.log(err);
                        });
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        getHouse()
        localStorage.getItem("authenticated")==="true" && IsAuthenticated()
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-5 mb-2 mx-auto w-3/4">
                <article className="overflow-hidden rounded-lg shadow-lg">
                    {imagem ? (
                        <HousePicsSwiper pics={imagem} />
                    ) : (
                        <p>loading</p>
                    )}

                    <div className="float-right mt-3 mr-2">
                        <button 
                        className="w-6 h-auto focus:ring-0 focus:outline-none mr-4" 
                        onClick={() => addInterest()}
                        >
                            {
                            interest ? 
                            <BsBookmarkFill size={24} color={'#F9C2A7'} /> 
                            :
                            <BsBookmarkPlus size={24} />
                            }
                        </button>
                        <button
                            className="w-6 h-auto focus:ring-0 focus:outline-none"
                            onClick={() => {
                                if (hostState !== undefined) {
                                    SendMessage(hostState.id, "")
                                        .then((res) => {
                                            setMessageSent(true);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                } else {
                                    console.log(
                                        "raise error here and refresh page"
                                    );
                                }
                            }}
                        >
                            {" "}
                            <AiOutlineMessage size={24} />
                        </button>
                    </div>
                    <div className="ml-5 mr-5 mt-3">
                        <h1 className="text-base xs:text-xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl font-semibold w-3/4">
                            {houseState?.title}
                        </h1>

                        <a
                            className="flex items-center no-underline hover:underline text-black"
                            href="#"
                        >
                            <img
                                alt="Placeholder"
                                className="block rounded-full mt-2 h-10 w-10"
                                src={hostState?.avatar}
                            />
                            <p className="ml-2">{hostState?.name}</p>
                        </a>
                        <div className="grid grid-cols-2 gap-2 ml-5 mr-5 mt-3">
                            <div>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold  mt-2 text-salmon">
                                    {t("hostedBy")} {hostState?.name}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">
                                    {houseState?.spaceType} {t("in")}{" "}
                                    {houseState?.houseType}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("rentalPrice")}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {houseState?.rent}€/{t("month")}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("commodities")}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {commodities(houseState?.commodities)}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("installations")}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {installations(houseState?.installations)}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("people")}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {houseState?.maxPeopleNum}{" "}
                                    <BsPeople className="inline" />
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("houseRules")}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1">
                                    {houseRules(houseState?.houseRules)}
                                </p>
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("rating")}
                                </p>
                                <br />
                                <div className="text-base xs:text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs mt-1">
                                    {rating(houseState?.rating)}
                                </div>
                            </div>
                            <div>
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("description")}:
                                </p>
                                {longDescription(houseState?.description)}
                                <br />
                                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-1">
                                    {t("closeServices")}:
                                </p>
                                {longDescription(houseState?.closeServices)}
                                <br />
                                <div className="mt-2">
                                    <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1 inline font-semibold">
                                        {t("location")}:{" "}
                                    </p>
                                    <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1 inline ">
                                        {houseState?.location}
                                    </p>
                                </div>
                                <br />
                                <div>
                                    <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1 inline font-semibold">
                                        {t("address")}:{" "}
                                    </p>
                                    <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl mt-1 inline">
                                        {houseState?.address}
                                    </p>
                                </div>
                                <div className="text-center">
                                    {isLoaded && !loading ? (
                                        <GoogleMap
                                            center={center}
                                            mapContainerStyle={mapStyle}
                                            zoom={17}
                                        >
                                            <Marker position={center} />
                                        </GoogleMap>
                                    ) : (
                                        <div>Loading</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <Popup
                            modal
                            trigger={
                                <button
                                    className=" h-16 w-48 bg-salmon mb-5 ml-5 rounded-full items-center float-left font-bold text-xl hover:bg-dark_blue hover:text-white"
                                    type="button"
                                >
                                    {t("book")}
                                </button>
                            }
                            position="top center"
                        >
                            <BookPopup
                                price={houseState?.rent}
                                pop={"info"}
                                title={houseState?.title}
                                name={hostState?.name}
                                ownerName={hostState?.name}
                                ownerId={hostState?.id}
                                address={houseState?.address}
                                rules={houseState?.houseRules}
                                houseId={houseState?.id}
                                ownerEmail={hostState?.email}
                                ownerPhone={hostState?.cellphoneNumber}
                                type = {"new"}
                            />
                        </Popup>
                    </footer>
                </article>
            </div>
            { localStorage.getItem("authenticated")==="true" && (
                <div className="fixed bottom-0 right-0 z-50">
                    <Chat update={messageSent} />
                </div>
            )}
            <Footer />
        </div>
    );
}

export default House;