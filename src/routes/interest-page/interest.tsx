import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./interest.css";
import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { HiPencilAlt } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import RemoveInterest from "../../components/RemoveInterestPopup/RemoveInterestPopup";
import Popup from "reactjs-popup";
import { GetHouseById, GetInterestsByUserId } from "../../_services/api";

export default function Interest() {
    const { t } = useTranslation();
    const [dataCorrect, setDataCorrect] = useState(false);
    const [houseArr, setHouseArr] = useState<any[]>([])

    class House {
        id: number;
        name: string;
        location: string;
        pic: any;
        date: any;
        numberLodgers: any;
        host: any;
        rating: any;

        constructor(
            id: number,
            name: string,
            location: string,
            pic: string,
            date: string,
            numberLodgers: string,
            host: string,
            rating: string
        ) {
            this.id = id;
            this.name = name;
            this.location = location;
            this.pic = pic;
            this.date = date;
            this.numberLodgers = numberLodgers;
            this.host = host;
            this.rating = rating;
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
    var house1 = new House(
        1,
        "Casa mais linda",
        "Benfica",
        imagem,
        myDateString,
        "3",
        "Maria Mendonça",
        "4.45"
    );
    var house2 = new House(
        2,
        "Casa com boa vista",
        "Lisboa Centro",
        imagem,
        myDateString,
        "4",
        "Marta Viegas",
        "4.45"
    );
    var house3 = new House(
        3,
        "Vivenda PGP",
        "Ajuda",
        imagem,
        myDateString,
        "5",
        "Maria Mendonça",
        "4.5"
    );
    var house4 = new House(
        4,
        "T1 Varanda grande",
        "Campo Grande",
        imagem,
        myDateString,
        "2",
        "Marta Viegas",
        "4.15"
    );
    var house5 = new House(
        5,
        "Home Sweet Home",
        "Alvalade",
        imagem,
        myDateString,
        "3",
        "Maria Mendonça",
        "4.25"
    );
    var house6 = new House(
        6,
        "casa6",
        "rua das pessoas",
        imagem,
        myDateString,
        "4",
        "Marta Viegas",
        "4.95"
    );

    var listOfHouses: Array<House>;

    listOfHouses = [house1, house2, house3, house4, house5, house6];
    const houseCards = [];

    for (const house of houseArr) {
        console.log(house)
        houseCards.push(
            <div className="bg-white rounded-lg m-10 w-80 h-120 inlineElements">
                <div className="mt-10 ml-5 mr-5">
                    <img
                        src={house.pictures[0]}
                        alt=""
                        className="flex items-center w-45 h-45 rounded-lg object-cover bg-gray-100"
                    />
                    <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5 mt-2">
                        {house.title}
                    </h2>
                    <div>
                        <h4 className="font-semibold text-gray-600 mb-0.5 mt-2">
                            {" "}
                            Location:{" "}
                        </h4>
                        <p className="text-gray-600 ml-2"> {house.location} </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-600 mb-0.5 mt-2">
                            {" "}
                            Next date available:{" "}
                        </h4>
                        <p className="text-gray-600 ml-2"> {house.dateAvailable} </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-600 mb-0.5 mt-2">
                            {" "}
                            Rating:{" "}
                        </h4>
                        <p className="text-gray-600 ml-2"> {house.rating}</p>
                    </div>
                    <div className="mt-10 mb-10">
                        <button type="button">
                            <div>
                                <Popup
                                    trigger={
                                        <button
                                            className={
                                                "bookBtn font-semibold ml-4"
                                            }
                                            type={"button"}
                                        >
                                            Remove
                                        </button>
                                    }
                                    modal
                                    nested
                                    position="top center"
                                >
                                    <RemoveInterest />
                                </Popup>
                            </div>
                        </button>
                        <Link to={"/house?id="+house.id}>
                            <button
                                className="bookBtnInitiate font-semibold ml-4"
                                type="button"
                            >
                                {" "}
                                Initiate Rental{" "}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        GetInterestsByUserId(JSON.parse(localStorage.getItem("userData") as string).id.toString())
            .then(res => {
                    let promises = [];

                    for (let i = 0; i < res.data.interests?.length; i++) {
                        promises.push(
                            GetHouseById(res.data.interests[i].idHouse)
                        );
                    }

                    Promise.all(promises).then((responses: any) => {
                        let tempHouseList = responses.map((d: any) => {
                            d.data.house.pictures = d.data.house.pictures.split(" ")
                            return d.data.house;
                        });
                        setHouseArr(tempHouseList);
                    });

            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="bg-main">
            <Navbar />
            <div className="m-14">{houseCards}</div>
            <Footer />
        </div>
    );
}
