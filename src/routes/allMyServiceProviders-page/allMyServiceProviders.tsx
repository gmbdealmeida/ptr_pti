import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./allMyServiceProviders.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function AllMyRServiceProviders() {
    const { t } = useTranslation();

    //GET USERS ID ON SERVICE CONTRACTS WITH CURRENT HOST ID
    

    class User {
        id: number;
        name: string;
        pic: any;
        service: string;
        registrationDate: any;
        bankAccountNum: number;
    
        constructor(
          id: number,
          name: string,
          pic: string,
          service: string,
          registrationDate: string,
          bankAccountNum: number,
        ) {
          this.id = id;
          this.name = name;
          this.pic = pic;
          this.service = service;
          this.registrationDate = registrationDate;
          this.bankAccountNum = bankAccountNum;
        }
    }
    
    var myDate = new Date();
    var myDateString;

    myDate.setDate(myDate.getDate());

    myDateString =
    ("0" + myDate.getDate()).slice(-2) +
    "/" +
    ("0" + (myDate.getMonth() + 1)).slice(-2) +
    "/" +
    myDate.getFullYear();

    var imagem = "https://picsum.photos/600/400/?random";
    var user1 = new User(1,"Maria Mendonça", imagem, "Cleaning", myDateString, 145678910);
    var user2 = new User(2, "Marta Viegas", imagem, "Ironing", myDateString, 145678910);
    var user3 = new User(3, "Maria Mendonça", imagem, "Cook", myDateString, 145678910);
    
    var listOfUsers: Array<User>;

    listOfUsers = [user1, user2, user3];
    const usersCards = [];

    for (const user of listOfUsers) {
        usersCards.push(
            <article className="p-4 flex space-x-4">
            <img src={user.pic} alt="" className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100" width="144" height="144" />
            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                {user.name}
                </h2>
                <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                <div className="text-gray-600">
                    <dt className="sr-only">Service</dt>
                    <dd> {user.service} </dd>
                </div>
                <div className="text-gray-600">
                    <dt className="sr-only">Date of registration</dt>
                    <dd> · {user.registrationDate} the registration</dd>
                </div>
                <div className="text-gray-600">
                    <dt className="sr-only">Bank Account Number</dt>
                    <dd> · {user.bankAccountNum} banck account number</dd>
                </div>
                </dl>
            </div>
            </article>
        );
    }  

    return (
        <div className="bg-main">
            <Navbar />
            <h1 className="label text-3xl mt-2">All My Service Providers</h1>
            <div className="bg-white rounded-lg m-20 bg-opacity-75">
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                    {usersCards}
                </div>
            </div>
            <Footer />
        </div>
    )

}

