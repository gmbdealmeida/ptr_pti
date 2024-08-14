import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./allOffersAdmin.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BsCheck } from "react-icons/bs";
import InformPopup from "../../components/InformPopup/InformPopup";
import ConfirmData from "../../components/ConfirmDataPopup/ConfirmDataPopup";
import Popup from "reactjs-popup";
import { GetAllHouses } from "../../_services/api";

export default function AllOffersAdmin() {
    const { t } = useTranslation();
    const [offers, setOffers] = useState([]);
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType") === "Admin" ? true : false
    );
    const [missing, setMissing] = useState([]);
    const [missingArr, setMissingArr] = useState<any[]>([]);
    const [mLength, setMissingLength] = useState();
    const [loading, setLoading] = useState(true);
    interface ISearchState {
        offers: any[];
        missing: any[];
    }

    useEffect(() => {
        if (accountType) {
            GetAllHouses().then((res) => {
                let tempMissingArr = [];
                for (let i = 0; i < res.data.houses.length; i++) {
                    res.data.houses[i].pictures =
                        res.data.houses[i].pictures.split(" ");
                    let houseCheck: any = [];
                    for (var key in res.data.houses[i]) {
                        // console.log(key);
                        if (res.data.houses[i].hasOwnProperty(key)) {
                            // console.log(res.data.houses[i][key]);
                            if (res.data.houses[i][key] === "") {
                                houseCheck.push(key);
                            }
                        }
                    }
                    tempMissingArr.push(houseCheck);
                }
                console.log(res.data.houses)
                setOffers(res.data.houses);
                setMissingArr(tempMissingArr);
            });
        }
    }, []);

    function seeWhatMissing(id: string) {
        let promise = new Promise((resolve, reject) => {
            let attrNames = [
                "id",
                "title",
                "hostId",
                "address",
                "location",
                "coordinates",
                "rent",
                "maxPeopleNum",
                "roomsNum",
                "area",
                "houseType",
                "spaceType",
                "description",
                "closeServices",
                "commodities",
                "houseRules",
                "installations",
                "rating",
                "timesRated",
                "dateAvailable",
                "pictures",
                "created_at",
                "updated_at",
            ];
            if (accountType) {
                offers.map((i: any, index: any) => {
                    if (i.id === id) {
                        let houseCheck: any = [];
                        for (var key in i) {
                            if (i.hasOwnProperty(key)) {
                                if (i[key] === "") {
                                    houseCheck.push(key);
                                }
                            }
                        }
                        setMissing(houseCheck);
                        setLoading(false);
                        resolve(houseCheck);
                    }
                });
            } else {
                reject(false);
            }
        });
        return promise;
    }

    function missingLength(idMissing: any) {
        seeWhatMissing(idMissing)
            .then((res) => {
                if (missing.length > 0) {
                    return (
                        <Popup
                            trigger={
                                <BsCheck
                                    size={20}
                                    className={
                                        "ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue"
                                    }
                                />
                            }
                            modal
                            nested
                            position="top center"
                        >
                            <InformPopup
                                houseId={idMissing}
                                missing={missing}
                            />
                        </Popup>
                    );
                } else {
                    return (
                        <Popup
                            trigger={
                                <BsCheck
                                    size={20}
                                    className={
                                        "ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue"
                                    }
                                />
                            }
                            modal
                            nested
                            position="top center"
                        >
                            <ConfirmData />
                        </Popup>
                    );
                }
            })
            .catch((er) => {
                return <div>Erro</div>;
            });
    }

    function whatToShow() {
        return (
            <div>
                {offers.map((i: any, index: any) => (
                    <article className="p-4 flex space-x-4">
                        <img
                            src={i.pictures[0]}
                            alt=""
                            className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100"
                            width="144"
                            height="144"
                        />
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
                                    <dt className="sr-only">
                                        Number of Lodgers
                                    </dt>
                                    <dd> · {i.maxPeopleNum} Lodgers</dd>
                                </div>
                                <div className="text-gray-600">
                                    <dt className="sr-only">
                                        Next date available
                                    </dt>
                                    <dd>
                                        {" "}
                                        · {i.dateAvailable} next date available
                                    </dd>
                                </div>
                                <div className="flex-none w-full mt-0.5 font-normal ml-1 text-gray-600 font-semibold">
                                    <dt className="inline">Address</dt>{" "}
                                    <dd className="inline text-gray-600 ml-1">
                                        {i.address}
                                    </dd>
                                </div>
                                <div className="absolute top-0 right-0 rounded-full bg-yellow-500 text-gray-600 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
                                    <dt className="text-yellow-500">
                                        <span className="sr-only">Rating</span>
                                        <svg
                                            className="mx-1 w-4 h-4 fill-current text-yellow-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    </dt>
                                    <dd>{parseFloat(i.rating)}</dd>
                                </div>
                                <div className="absolute top-4 right-0 px-2 py-3">
                                    <div>
                                        {/* {missingArr[index]?.length.toString() + " " + missingArr[index]?.join(", ")} */}
                                        {missingArr[index]?.length > 0 ? (
                                            <Popup
                                                trigger={
                                                    <BsCheck
                                                        size={20}
                                                        className={
                                                            "ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue"
                                                        }
                                                    />
                                                }
                                                modal
                                                nested
                                                position="top center"
                                            >
                                                <InformPopup
                                                    houseId={i.id}
                                                    missing={missingArr[index]}
                                                />
                                            </Popup>
                                        ) : (
                                            <Popup
                                                trigger={
                                                    <BsCheck
                                                        size={20}
                                                        className={
                                                            "ml-3 mr-2 mb-3 mt-1 text-gray-600 group-hover:dark_blue"
                                                        }
                                                    />
                                                }
                                                modal
                                                nested
                                                position="top center"
                                            >
                                                <ConfirmData />
                                            </Popup>
                                        )}
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </article>
                ))}
            </div>
        );
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
    );
}
