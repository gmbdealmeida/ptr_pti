import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./transactions.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BsArrowDownRight } from "react-icons/bs";
import { BsArrowUpLeft } from "react-icons/bs";
import { GetTransactionByUserId, GetUserById } from "../../_services/api";
import moment from "moment";

export default function Transactions() {
    const { t } = useTranslation();
    const [dataCorrect, setDataCorrect] = useState(false);
    const [arrTransaction, setArrTransaction] = useState<any[]>([]);
    const [arrHostNames, setArrHostNames] = useState<any[]>([]);

    class Transaction {
        type: any;
        id: number;
        date: any;
        from: any;
        to: any;
        coins: any;
        amount: any;

        constructor(
            type: string,
            id: number,
            date: string,
            from: string,
            to: string,
            coins: string,
            amount: string
        ) {
            this.type = type;
            this.id = id;
            this.date = date;
            this.from = from;
            this.to = to;
            this.coins = coins;
            this.amount = amount;
        }
    }
    var myDate = new Date();
    var myDateString: string;

    myDate.setDate(myDate.getDate());

    myDateString =
        ("0" + myDate.getDate()).slice(-2) +
        "/" +
        ("0" + (myDate.getMonth() + 1)).slice(-2) +
        "/" +
        myDate.getFullYear();

    var myDate1 = new Date(2021, 1, 10);
    var myDate1S: string;
    myDate1S =
        ("0" + myDate1.getDate()).slice(-2) +
        "/" +
        ("0" + (myDate1.getMonth() + 1)).slice(-2) +
        "/" +
        myDate1.getFullYear();

    var myDate2 = new Date(2021, 2, 11);
    var myDate2S: string;
    myDate2S =
        ("0" + myDate2.getDate()).slice(-2) +
        "/" +
        ("0" + (myDate2.getMonth() + 1)).slice(-2) +
        "/" +
        myDate2.getFullYear();

    var transaction1 = new Transaction(
        "payment",
        1,
        myDateString,
        "Maria Mendonça",
        "Marta Viegas",
        "EUR",
        "300"
    );
    var transaction2 = new Transaction(
        "receive",
        2,
        myDateString,
        "Marta Viegas",
        "Maria Mendonça",
        "EUR",
        "300"
    );
    var transaction3 = new Transaction(
        "payment",
        3,
        myDate1S,
        "Maria Mendonça",
        "Marta Viegas",
        "EUR",
        "300"
    );
    var transaction4 = new Transaction(
        "receive",
        4,
        myDate2S,
        "Marta Viegas",
        "Maria Mendonça",
        "EUR",
        "300"
    );
    var transaction5 = new Transaction(
        "payment",
        5,
        myDate2S,
        "Maria Mendonça",
        "Marta Viegas",
        "EUR",
        "300"
    );
    var transaction6 = new Transaction(
        "receive",
        6,
        myDateString,
        "Marta Viegas",
        "Maria Mendonça",
        "EUR",
        "300"
    );

    var listOfTransactions: Array<Transaction>;
    listOfTransactions = [
        transaction1,
        transaction2,
        transaction3,
        transaction4,
        transaction5,
        transaction6,
    ];
    const transactionLine = [];

    function type(typeTransaction: string) {
        if (typeTransaction === "payment") {
            return (
                <div className="px-2 py-2 bg-green-500">
                    <BsArrowDownRight
                        size={20}
                        className={"w-5 h-5 text-white"}
                    />
                </div>
            );
        }
        if (typeTransaction === "receive") {
            return (
                <div className="px-2 py-2 bg-red-600">
                    <BsArrowUpLeft size={20} className={"w-5 h-5 text-white"} />
                </div>
            );
        }
    }

    for (const transaction of listOfTransactions) {
        transactionLine.push(
            <tr>
                <td>{type(transaction.type)}</td>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>{transaction.coins}</td>
                <td>{transaction.amount}</td>
            </tr>
        );
    }
    useEffect(() => {
        GetTransactionByUserId(
            JSON.parse(localStorage.getItem("userData") as string).id.toString()
        )
            .then((res) => {
                console.log(res);
                if (
                    JSON.parse(localStorage.getItem("userData") as string)
                        .accountType === "Student"
                ) {
                    setArrTransaction(res.data.transactionsBuyer);
                    let promises = [];

                    for (
                        let i = 0;
                        i < res.data.transactionsBuyer?.length;
                        i++
                    ) {
                        promises.push(
                            GetUserById(res.data.transactionsBuyer[i].sellerId)
                        );
                    }

                    Promise.all(promises).then((responses: any) => {
                        let hostId = responses.map((d: any) => {
                            return d.data.user.name;
                        });
                        setArrHostNames(hostId);
                    });
                } else if (
                    JSON.parse(localStorage.getItem("userData") as string)
                        .accountType === "Host"
                ) {
                    setArrTransaction(res.data.transactionsSeller);

                    let promises = [];

                    for (
                        let i = 0;
                        i < res.data.transactionsSeller?.length;
                        i++
                    ) {
                        promises.push(
                            GetUserById(res.data.transactionsSeller[i].buyerId)
                        );
                    }

                    Promise.all(promises).then((responses: any) => {
                        let hostId = responses.map((d: any) => {
                            return d.data.user.name;
                        });
                        setArrHostNames(hostId);
                    });
                }
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="bg-main">
            <Navbar />
            <div className="ml-40 p-20">
                <table className="bg-white rounded-lg table-fixed">
                    <thead>
                        <tr>
                            <th className="w-25">Transaction id</th>
                            <th className="w-25">Date</th>
                            <th className="w-25">From</th>
                            <th className="w-25">To</th>
                            <th className="w-25">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrTransaction.map((v: any, i: number) => {
                            return (
                                <tr>
                                    <td>{v.id}</td>
                                    <td>
                                        {moment(v.created_at).format(
                                            "YYYY/M/D"
                                        )}
                                    </td>
                                    <td>
                                        {
                                            JSON.parse(
                                                localStorage.getItem(
                                                    "userData"
                                                ) as string
                                            ).name
                                        }
                                    </td>
                                    <td>{arrHostNames[i]}</td>
                                    <td>{v.amount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}
