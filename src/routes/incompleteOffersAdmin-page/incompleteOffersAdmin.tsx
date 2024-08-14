import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./incompleteOffersAdmin.css";
import Carousel from '../../components/Carousel/Carousel';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { AiOutlineCloudDownload } from "react-icons/ai";
import CloseService from "../../components/CloseServicePopup/CloseServicePopup";
import Popup from 'reactjs-popup';
import { GetAllHouses } from "../../_services/api";

export default function IncompleteOffersAdmin() {
    const { t } = useTranslation();
    const [dataCorrect, setDataCorrect] = useState(false);
    const [offers, setOffers] = useState([]);
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType") === "Host" ? true : false
    );
    interface ISearchState {
        offers: any[];
    }

    useEffect(() => {
        if (accountType) {
            GetAllHouses() 
                .then(res => {
                    let housesArr = []
                    if(typeof res.data.houses === "object") {
                        for (var key in res.data.houses) {
                            if (res.data.houses.hasOwnProperty(key)) {
                                if (res.data.houses[key].closeServices === "") {
                                    housesArr.push( res.data.houses[key]);
                                }
                            }
                        }
                    } else {
                        housesArr = res.data.houses
                    }
                    setOffers(housesArr)
                })
        }
        
    }, []);


    function whatToShow() {
        return (
            <div>
                {offers.map((i: any, index: any) => (
                    <article className="p-4 flex space-x-4">
                    <img src={i.pictures} alt="" className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100" width="144" height="144" />
                    <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                        <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                        {i.title}
                        </h2>
                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="text-gray-600">
                            <dt className="sr-only">Location</dt>
                            <dd> {i.location} </dd>
                        </div>
                        <div className="text-gray-600">
                            <dt className="sr-only">Number of Lodgers</dt>
                            <dd> · {i.numberLodgers} Lodgers</dd>
                        </div>
                        <div className="text-gray-600">
                            <dt className="sr-only">Next date available</dt>
                            <dd> · {i.dateAvailable} next date available</dd>
                        </div>
                        <div className="flex-none w-full mt-0.5 font-normal ml-1 text-gray-600">
                            <dt className="inline">Host</dt>{' '}
                            <dd className="inline text-gray-600 ml-1">{i.host}</dd>
                        </div>
                        <div className="absolute top-0 right-0 rounded-full bg-yellow-500 text-gray-600 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
                            <dt className="text-yellow-500">
                            <span className="sr-only">Rating</span>
                            <svg className="mx-1 w-4 h-4 fill-current text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            </dt>
                            <dd>{i.rating}</dd>
                        </div>

                        <div className="absolute top-4 right-0 px-2 py-3">
                            <button type="button">
                                <div>
                                    <Popup
                                        trigger={<AiOutlineCloudDownload size={20} className={'ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue'}/>}
                                        modal
                                        nested
                                        position="top center"
                                    
                                    >
                                        <CloseService />
                                    </Popup>
                                </div>
                            </button>
                            
                        </div>
                        </dl>
                    </div>
                    </article>
                ))}
            </div>
        )
    }  

    return (
        <div className="bg-main">
            <Navbar />
            <div className="bg-white rounded-lg m-20 bg-opacity-75">
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                    {whatToShow()}
                </div>
            </div>
            <Footer />
        </div>
    )

}


