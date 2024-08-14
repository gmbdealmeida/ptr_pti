import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./myCurrentRental.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { GetContractByUserId, GetContractById, GetHouseById, AddReview } from "../../_services/api";
import CircleLoader from "react-spinners/CircleLoader";
import Chat from "../../components/Chat/Chat";
import { toast } from "react-toastify";
import i18n from "../../i18nextConf";

interface IHouse {
    address: string;
    area: number;
    closeServices: string;
    commodities: string;
    coordinates: string;
    created_at: string;
    dateAvailable: string;
    description: string;
    hostId: string;
    houseRules: string;
    houseType: string;
    id: number;
    installations: string;
    location: string;
    maxPeopleNum: number;
    pictures: string;
    rating: number;
    rent: number;
    roomsNum: number;
    spaceType: string;
    timesRated: number;
    title: string;
    updated_at: string;
}
interface IContract {
    created_at: string;
    houseId: string;
    price: string;
    startContract: string;
    endContract: string;
    terms: string;
}
let rateOneTime = i18n.t('rateOneTime') //placeholder
let ratedSuccess = i18n.t('ratedSuccess') //placeholder
const possibleFeedbacks = {
    sucessfullRateFeedback: ratedSuccess,
    errorFeedback: rateOneTime
  };

  const feebackBoxStyling = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    draggable: true,
  }

  const sucessfullRateFeedback = () => toast.dark(possibleFeedbacks.sucessfullRateFeedback, feebackBoxStyling);
  const errorFeedback = () => toast.dark(possibleFeedbacks.errorFeedback, feebackBoxStyling);
  

export default function MyCurrentRental() {
    const { t } = useTranslation();
    const [houseRate, SetHouseRate] = useState<string>('');
    const [houseId, setHouseId] = useState<string>('');
    const [currentRental, setCurrentRental] = useState<IContract>();
    const [loading, setLoading] = useState(true);
    const [house, setHouse] = useState<IHouse>();
    const [star1, setStar1] = useState<string>('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
    const [star2, setStar2] = useState<string>('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
    const [star3, setStar3] = useState<string>('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
    const [star4, setStar4] = useState<string>('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
    const [star5, setStar5] = useState<string>('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
    const [hasRental, setHasRental] = useState<boolean>(false);
    const [accountType, setAccountType] = useState(
        JSON.parse(localStorage.getItem("userData") as string).accountType === "Student" ? true : false
    );

    useEffect(() => {
        setLoading(true);
        if (accountType) {
            let userId = JSON.parse(localStorage.getItem("userData") as string).id;
            GetContractByUserId(userId) 
                .then(res => {
                    if(res.data[1].contractsAsStudent.length > 0){
                        setHasRental(true);
                        GetContractById(res.data[1].contractsAsStudent[0].contractId) 
                        .then(res => {
                            setCurrentRental(res.data[0].contract);
                            GetHouseById(res.data[0].contract.houseId) 
                            .then(res => {
                                    setHouseId(res.data.house.id);
                                    setHouse(res.data.house);
                                    setLoading(false);
                                })
                            })
                        }
                })
        }
        
    }, []);

    function rate(){
        if (houseRate != ''){
            let userId = JSON.parse(localStorage.getItem("userData") as string).id;
            setLoading(true);
            console.log(userId.toString(), currentRental?.houseId.toString(), houseRate, 'house')
            AddReview(userId.toString(), currentRental?.houseId.toString(), houseRate, 'house') 
                .then(res => {
                    if (res.data.message == "CREATED"){
                        AddReview(userId, house?.hostId, houseRate, 'user') 
                        .then(res => {
                            if (res.data.message == "CREATED"){
                                sucessfullRateFeedback();
                                GetHouseById(houseId) 
                                    .then(res => {
                                        setHouse(res.data.house);
                                        setLoading(false);
                                    })
                            }
                        })
                    }
                    else{
                        errorFeedback();
                        setLoading(false);
                    }
                })
        }
    }
    
    function selectStar(id:string){
        switch(id) { 
            case '1': { 
                setStar1('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar2('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                setStar3('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                setStar4('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                setStar5('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                SetHouseRate('1');
               break; 
            } 
            case '2': { 
                setStar1('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar2('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar3('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                setStar4('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                setStar5('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                SetHouseRate('2');
               break; 
            } 
            case '3': { 
                setStar1('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar2('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar3('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar4('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                setStar5('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                SetHouseRate('3');
               break; 
            } 
            case '4': { 
                setStar1('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar2('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar3('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar4('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar5('https://static.vecteezy.com/system/resources/previews/001/189/057/original/star-png.png');
                SetHouseRate('4');
               break; 
            } 
            case '5': { 
                setStar1('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar2('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar3('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar4('https://pngimg.com/uploads/star/star_PNG1597.png');
                setStar5('https://pngimg.com/uploads/star/star_PNG1597.png');
                SetHouseRate('5');
               break; 
            } 
    
         } 
    }

    return (
        
        <div className="bg-main">
            <div style={{position: 'absolute', left: '45%', top: '40%',transform: 'translate(-50%, -50%)'}}>
                <CircleLoader color='#cccccc' loading={loading} size={150} />
            </div>
            <Navbar />
            <h1 className="label text-3xl mt-2">{t("myCurrentRental")}</h1>
            {hasRental &&
                <div className="bg-white rounded-lg m-20 bg-opacity-75">    
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                <article className="p-4 flex space-x-4">
                    <img src={house?.pictures.split(" ")[0]} alt="" className="flex-none w-10 h-10 rounded-lg object-cover bg-gray-100" width="144" height="144" />
                    <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                        <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                        {house?.title}
                        </h2>
                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="text-gray-600">
                            <dd> {t("startDate")}: {currentRental?.startContract}</dd>
                        </div>
                        <div className="text-gray-600">
                        <dd> {t("endDate")}: {currentRental?.endContract}</dd>
                        </div>
                        </dl>
                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="text-gray-600">
                            <dd> {t("rules")}: {house?.houseRules}</dd>
                        </div>
                        </dl>
                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="text-gray-600">
                            <dd> {t("termsContract")}: {currentRental?.terms.split(";").map((v: any, i: number) => {
                                return(
                                    <div>
                                    <p>{v}</p>
                                    <br />
                                    </div>
                                )
                            })}</dd>
                        </div>
                        </dl>
                    </div>
                    </article>
                    
                
                </div>
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                <article className="p-4 flex space-x-4">
                
                    <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">

                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">

                        <div className="text-gray-600">
                            <dd> {t("currentRating")}: {house?.rating}</dd>
                        </div>
                        </dl>
                    </div>
                    </article>
                    <img id="star1" onClick={() => selectStar('1')} src={star1} alt="" style={{float:'left'}} width="90" height="90" />
                    <img id="star2" onClick={() => selectStar('2')} src={star2} alt="" style={{float:'left'}} width="90" height="90" />
                    <img id="star3" onClick={() => selectStar('3')} src={star3} alt="" style={{float:'left'}} width="90" height="90" />
                    <img id="star4" onClick={() => selectStar('4')} src={star4} alt="" style={{float:'left'}} width="90" height="90" />
                    <img id="star5" onClick={() => selectStar('5')} src={star5} alt="" style={{float:'left'}} width="90" height="90" />

                    
                    <button
                        onClick={() => rate()}
                        className=" h-16 w-48 bg-salmon mb-5 ml-5 rounded-full items-center float-center font-bold text-xl hover:bg-dark_blue hover:text-white"
                        type="button"
                    >
                        {t("rate")}
                    </button>
                
                </div>
            </div>
            }
            {!hasRental &&
                <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
                <article className="p-4 flex space-x-4">
                    <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                        <h2 className="text-lg font-semibold text-gray-600 mb-0.5 ml-0.5">
                        You don't have a current rental !
                        </h2>
                    </div>
                    </article>
                </div>
            }
            
            { localStorage.getItem("authenticated")==="true" && (
                <div className="fixed bottom-0 right-0 z-50">
                    <Chat />
                </div>
            )}
            <Footer />
        </div>
    )

}

