import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./allMyRenters.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
// import { GetRentersWithHouseFromOwner } from "../../_services/api";

export default function AllMyRenters() {
    const { t } = useTranslation();
    const [renters, setRenters] = useState([]);
    const [accountType, setAccountType] = useState(
        localStorage.getItem("accountType") === "Host" ? true : false
    );

    const [idOwner, setIdOwner] = useState(localStorage.getItem("id") || '');

    interface ISearchState {
        offers: any[];
        idOwner: string;
    }

    useEffect(() => {
        if (accountType) {
            // GetRentersWithHouseFromOwner(idOwner) 
            //     .then(res => {
            //         let rentersHouseArr = []
            //         if(typeof res.data.houses === "object") {
            //             for (var key in res.data.houses) {
            //                 if (res.data.houses.hasOwnProperty(key)) {
            //                     rentersHouseArr.push( res.data.houses[key]);
            //                 }
            //             }
            //         } else {
            //             rentersHouseArr = res.data.houses
            //         }
            //         setRenters(rentersHouseArr)
            //     })
        }
        
    }, []);

    //GET USERS ID ON CONTRACTS WITH CURRENT HOST ID
    

    // class User {
    //     id: number;
    //     name: string;
    //     pic: any;
    //     type: string;
    //     registrationDate: any;
    //     bankAccountNum: number;
    
    //     constructor(
    //       id: number,
    //       name: string,
    //       pic: string,
    //       type: string,
    //       registrationDate: string,
    //       bankAccountNum: number,
    //     ) {
    //       this.id = id;
    //       this.name = name;
    //       this.pic = pic;
    //       this.type = type;
    //       this.registrationDate = registrationDate;
    //       this.bankAccountNum = bankAccountNum;
    //     }
    // }
    
    // var myDate = new Date();
    // var myDateString;

    // myDate.setDate(myDate.getDate());

    // myDateString =
    // ("0" + myDate.getDate()).slice(-2) +
    // "/" +
    // ("0" + (myDate.getMonth() + 1)).slice(-2) +
    // "/" +
    // myDate.getFullYear();

    // var imagem = "https://picsum.photos/600/400/?random";
    // var user1 = new User(1,"Maria Mendonça", imagem, "host", myDateString, 145678910);
    // var user2 = new User(2, "Marta Viegas", imagem, "student", myDateString, 145678910);
    // var user3 = new User(3, "Maria Mendonça", imagem, "host", myDateString, 145678910);
    // var user4 = new User(4, "Marta Viegas", imagem, "student", myDateString, 145678910);
    // var user5 = new User(5, "Maria Mendonça", imagem, "host", myDateString, 145678910);
    // var user6 = new User(6, "Marta Viegas", imagem, "student", myDateString, 145678910);
    
    // var listOfUsers: Array<User>;

    // listOfUsers = [user1, user2, user3, user4, user5, user6];
    // const usersCards = [];
    function whatToShow() {
        return (
            <div>
                {renters.map((i: any, index: any) => (
                    <article className="p-4 flex space-x-4">
                    <img src={i.pic} alt="" className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100" width="144" height="144" />
                    <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                        <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                        {i.name}
                        </h2>
                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="text-gray-600">
                            <dt className="sr-only">Type</dt>
                            <dd> {i.type} </dd>
                        </div>
                        <div className="text-gray-600">
                            <dt className="sr-only">Date of registration</dt>
                            <dd> · {i.registrationDate} the registration</dd>
                        </div>
                        <div className="text-gray-600">
                            <dt className="sr-only">Bank Account Number</dt>
                            <dd> · {i.bankAccountNum} banck account number</dd>
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
            <h1 className="label text-3xl mt-2">All My Renters</h1>
            <div className="bg-white rounded-lg m-20 bg-opacity-75">
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                    {whatToShow()}
                </div>
            </div>
            <Footer />
        </div>
    )

}

