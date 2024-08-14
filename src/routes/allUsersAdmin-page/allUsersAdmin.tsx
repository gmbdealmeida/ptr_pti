import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./allUsersAdmin.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {GetAllUsers} from "../../_services/api";

export default function AllUsersAdmin() {
    const { t } = useTranslation();

    const [usersIn, setUsers] = useState([]);
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType") === "Admin" ? true : false
    );
    interface ISearchState {
        usersIn: any[];
    }


    useEffect(()=>{
        console.log(accountType)
        if (accountType) {
            GetAllUsers().then((res) => {
                let tempMissingArr = [];
                for (let i = 0; i < res.data.users.length; i++) {
                    let houseCheck: any = [];
                    for (var key in res.data.users[i]) {
                        console.log(key);
                        if (res.data.users[i].hasOwnProperty(key)) {
                            console.log(res.data.users[i][key]);
                            if (res.data.users[i][key] === "") {
                                houseCheck.push(key);
                            }
                        }
                    }
                    tempMissingArr.push(houseCheck);
                }
                setUsers(res.data.users);
                // setMissingArr(tempMissingArr);
            });
        }
    }, []);

    function whatToShow() {
        return (
            <div>
                {usersIn.map((i:any, index:any)=>(
                    <article className="p-4 flex space-x-4">
                        <img src={i.avatar} alt="" className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100" width="144" height="144" />
                        <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                            <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                            {i.name}
                            </h2>
                            <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                            <div className="text-gray-600">
                                <dt className="sr-only">Type</dt>
                                <dd> Type: {i.accountType} </dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">Date of registration</dt>
                                <dd> ·  Date of registration: {i.created_at} </dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">Bank Account Number</dt>
                                <dd> · Bank account number: {i.bankAccountNumber}</dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">ID</dt>
                                <dd> · ID: {i.id}</dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">Cellphone Number</dt>
                                <dd> · Cellphone number: {i.cellphoneNumber}</dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">Username</dt>
                                <dd> ·  Username: {i.username}</dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">Gender</dt>
                                <dd> ·  Gender: {i.gender}</dd>
                            </div>
                            <div className="text-gray-600">
                                <dt className="sr-only">Email</dt>
                                <dd> ·  Email: {i.email}</dd>
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

