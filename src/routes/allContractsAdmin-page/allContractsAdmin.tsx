import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { GetAllContracts } from "../../_services/api";
import { GetHouseById } from "../../_services/api";
import { Link } from "react-router-dom";

export default function AllContractsAdmin() {
    const { t } = useTranslation();
    const [contracts, setContracts] = useState([]);
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType") === "Admin" ? true : false
    );
	const [loading, setLoading] = useState(true)
    const [nameHouse, setNameHouse] = useState<any>();
    interface ISearchState {
        contracts: any[];
    }

    useEffect(() => {
        if (accountType) {
            GetAllContracts().then((res) => {
                setContracts(res.data[0].Contracts);
                console.log(res);

                let promises = [];

                for (let i = 0; i < res.data.length; i++) {
                    promises.push(
                        GetHouseById(res.data[0].Contracts[i].houseId)
                    );
                }

                Promise.all(promises).then((responses: any) => {
                    let houses = responses.map((d: any) => {
						console.log(d.data)
                        return d.data.house;
                    });
                    setNameHouse(houses);
					setLoading(false)
                });
            });
        }
    }, []);

    function whatToShow() {
        return (
            <div>
                {contracts.map((i: any, index: any) => (
                    <article className="p-4 flex space-x-4">
                        <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                            <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
								<Link to={"/house?id="+nameHouse[index]?.id}>
                                	{nameHouse[index]?.title}
								</Link>
                            </h2>
                            <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                                <div className="text-gray-600 mr-5">
                                    <dt>
                                        Start date contract
                                    </dt>
                                    <dd> {i.startContract} </dd>
                                </div>
                                <div className="text-gray-600 mr-5">
                                    <dt >
                                        End date contract
                                    </dt>
                                    <dd> {i.endContract} </dd>
                                </div>
                                <div className="text-gray-600 mr-5">
                                    <dt >Contract price</dt>
                                    <dd> {i.price} </dd>
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
					{loading ? 
					<div></div>
					:
					whatToShow()
					}
                </div>
            </div>
            <Footer />
        </div>
    );
}
