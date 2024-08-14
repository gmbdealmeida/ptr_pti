import React, { Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../Language-Changer/Language-Changer";
import { Transition } from "@headlessui/react";
import IsAuthenticated, { LogOut } from "../../_services/Authenticator";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

//Assests
import Logo from "../../assets/Logo.png";
import wideLogo from "../../assets/logoUHome.png";

export default function Navbar() {
    const { t } = useTranslation();

    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>()

    /*
  Verificar se o user está logged in,
   se este não estiver não há a opçao no canto direito do dropdown
  */
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("authenticated") === "true" ? true : false
    );
    const [ProfilePicture, setProfilePicture] = useState();
	
    let DesktopNavbar;
    let MobileNavbar;
    let SearchNavbar;

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("authenticated") === "true" ? true : false)
        setProfilePicture(localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData") as string)).avatar : "https://storage.cloud.google.com/ptr-pti-cdn/avatars/user.jpeg")
    }, []);

    let location = useLocation();
    function showHideSearch() {
        if (location.pathname !== "/") {
            let searchNavbar = document.getElementById("searchNavbar");
            if (isSearchOpen) {
                searchNavbar?.classList.remove("w-48");
                searchNavbar?.classList.add("w-0");
            } else {
                searchNavbar?.classList.remove("w-0");
                searchNavbar?.classList.add("w-48");
            }
            setIsSearchOpen(!isSearchOpen);
        }
    }

    const handleSubmit = (event: any) => {
        if(event.key === "Enter"){
            let loc = (document.getElementById("searchNavbar") as HTMLInputElement).value
            window.location.href = "/search?location=" + loc
        }
    }

    if (location.pathname !== "/") {
        SearchNavbar = (
            <div className="flex items-center justify-end mr-16 sm:mr-0">
                <div className="flex-shrink-0 flex items-center">
                    <input
                        id="searchNavbar"
                        className="border-none focus:ring-0 bg-transparent transition-width duration-500 ease-in-out transform w-0"
                        type="text"
                        placeholder="Search"
                        onKeyDown={handleSubmit}
                    />
                    <div onClick={showHideSearch}>
                        <FaSearch className="h-6 w-6 transition duration-500 ease-in-out transform hover:rotate-360" />
                    </div>
                </div>
            </div>
        );
    }

    if (isLoggedIn) {
        DesktopNavbar = (
            <div className="ml-3 relative">
                <div>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        type="button"
                        className=" flex text-sm rounded-full focus:outline-none focus:ring-0"
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                    >
                        <span className="sr-only">{t("open-menu")}</span>
                        {ProfilePicture ? (
                            <img
                                className="h-8 w-8 rounded-full"
                                src={ProfilePicture}
                                alt=""
                            />
                        ) : (
                            <FaUserCircle className="h-8 w-8" />
                        )}
                    </button>
                </div>
                <Transition
                    show={isProfileOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-dark_blue ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                    >
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-white hover:bg-darker_blue bg-dark_blue"
                            role="menuitem"
                        >
                            {t("profile")}
                        </Link>
                        <LanguageChanger />
                        <Link
                            to="/thisPageDoesNotExist"
                            className="block px-4 py-2 text-sm text-white hover:bg-darker_blue bg-dark_blue"
                            role="menuitem"
                            onClick={() => LogOut()}
                        >
                            {t("sign-out")}
                        </Link>
                    </div>
                </Transition>
            </div>
        );
        MobileNavbar = "";
    } else {
        DesktopNavbar = (
            <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="bg-dark_blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-darker_blue"
                    >
                        {t("login")}
                    </Link>
                    <Link
                        to="register"
                        className="bg-dark_blue text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-darker_blue"
                    >
                        {t("sign-up")}
                    </Link>
                    <div className="relative mt-1">
                        <MdSettings
                            className="w-7 h-7 self-center text-dark_blue hover:text-darker_blue cursor-pointer"
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        ></MdSettings>
                        <Transition
                            show={isSettingsOpen}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <div
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-dark_blue ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="setting-menu"
                            >
                                <LanguageChanger />
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        );

        MobileNavbar = (
            <button
                onClick={() => setIsMainOpen(!isMainOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white bg-dark_blue hover:bg-darker_blue focus:outline-none focus:ring-0"
                aria-controls="mobile-menu"
                aria-expanded="false"
            >
                <span className="sr-only">{t("open-menu")}</span>
                <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    stroke="#ffffff"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

                <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    stroke="#ffffff"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        );
    }

    return (
        <div className="">
            <div className="max-w-full px-2 sm:px-6 lg:px-6">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to={localStorage.getItem('authenticated') === 'true' ? "/home" : "/"}>
                                <img
                                    className="block lg:hidden h-12 w-auto"
                                    src={wideLogo}
                                    alt="Logo"
                                />
                            </Link>
                            <Link to={localStorage.getItem('authenticated') === 'true' ? "/home" : "/"}>
                                <img
                                    className="hidden lg:block h-20 w-auto"
                                    src={wideLogo}
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                    </div>
                    {SearchNavbar}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {DesktopNavbar}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:hidden">
                        {MobileNavbar}
                    </div>
                </div>
            </div>
            <Transition
                show={isMainOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/login"
                            className="bg-dark_blue text-white block px-3 py-2 rounded-md text-base text-center font-medium hover:bg-darker_blue"
                        >
                            {t("login")}
                        </Link>
                        <Link
                            to="/register"
                            className="bg-dark_blue text-white block px-3 py-2 rounded-md text-base text-center font-medium hover:bg-darker_blue"
                        >
                            {t("sign-up")}
                        </Link>
                        <LanguageChanger mobile={true} />
                    </div>
                </div>
            </Transition>
        </div>
    );
}
