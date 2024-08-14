import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./allMyOffers.css";
import Carousel from '../../components/Carousel/Carousel';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { HiPencilAlt } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import Popup from 'reactjs-popup';
import EditHousePopup from "../../components/EditHousePopup/EditHousePopup";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import { GetHousesWithOwnerId } from "../../_services/api";
import { Link } from "react-router-dom";

export default function AllMyOffers() {
    const { t } = useTranslation();
    const [dataCorrect, setDataCorrect] = useState(false);
    const [houses, setHouses] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    var myDate = new Date();
    var myDateString;

    myDate.setDate(myDate.getDate());

    myDateString =
        ("0" + myDate.getDate()).slice(-2) +
        "/" +
        ("0" + (myDate.getMonth() + 1)).slice(-2) +
        "/" +
        myDate.getFullYear();

    let paramsIndex = {
        address: "address", location: "location", coordinates: "coordinates",
        rent: "rent", maxPeopleNum: "maxPeopleNum", roomsNum: "roomsNum",
        area: "area", houseType: "houseType", spaceType: "spaceType",
        description: "description", houseRules: "houseRules", dateAvailable: "dateAvailable"
    }

    // let user = localStorage.getItem("userData")
    // console.log(user)
    let ownerid = JSON.parse(localStorage.getItem("userData") as string).id
    useEffect(() => {
        GetHousesWithOwnerId(ownerid)
            .then(res => {
                console.log(res)
                for (let i = 0; i < res.data.houses?.length; i++) {
                    res.data.houses[i].pictures = res.data.houses[i].pictures.split(" ")
                }
                setHouses(res.data.houses)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="bg-main">
            <Navbar />
            <h1 className="label text-3xl mt-2">All my offers</h1>
            <div className="bg-white rounded-lg m-20 bg-opacity-75">
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                    {}
                    {houses.map((i: any, index: any) => {
                        console.log(i)
                        return (
                        <article className="p-4 flex space-x-4">
                            <img src={i.pictures[0]} alt="" className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100" width="144" height="144" />
                            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                                <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                                    <Link to={"/house?id="+i.id}>
                                        {i.title}
                                    </Link>
                                </h2>
                                <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                                    <div className="text-gray-600">
                                        <dt className="sr-only">Location</dt>
                                        <dd> {i.location} </dd>
                                    </div>
                                    <div className="text-gray-600">
                                        <dt className="sr-only">Number of Lodgers</dt>
                                        <dd> · {i.maxPeopleNum} Lodgers</dd>
                                    </div>
                                    <div className="text-gray-600">
                                        <dt className="sr-only">Next date available</dt>
                                        <dd> · {i.dateAvailable} next date available</dd>
                                    </div>
                                    <div className="flex-none w-full mt-0.5 font-normal ml-1 text-gray-600">
                                        <dt className="inline">Host</dt>{' '}
                                        <dd className="inline text-gray-600 ml-1">{i.host}</dd>
                                    </div>
                                    <div className="absolute top-4 right-0 px-2 py-3">
                                        <button type="button">
                                            <div>
                                                <Popup
                                                    trigger={<HiPencilAlt size={20} className={'ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue'} title={t("edit")} />}
                                                    modal
                                                    nested
                                                    position="top center"
                                                >
                                                    <EditHousePopup houseId={i.id} />
                                                </Popup>
                                            </div>
                                        </button>

                                        <button type="button">
                                            <div>
                                                <Popup
                                                    trigger={<FiTrash2 size={20} className={'ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue'} title={t("delete")} />}
                                                    modal
                                                    nested
                                                    position="top center"
                                                >
                                                    <DeletePopup houseId={i.id} />
                                                </Popup>
                                            </div>
                                        </button>

                                    </div>

                                </dl>
                            </div>
                        </article>
                        )
                    }
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )

}