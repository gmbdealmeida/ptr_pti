import React from "react";
import "./myBadges.css";

import OneAddedFav from "../../assets/5AddedFav.png";
import TwoAddedFav from "../../assets/15AddedFav.png";
import ThreeAddedFav from "../../assets/30AddedFav.png";
import OneOffersPublished from "../../assets/5OffersPublished.png";
import TwoOffersPublished from "../../assets/15OffersPublished.png";
import ThreeOffersPublished from "../../assets/30OffersPublished.png";
import OneStarReview from "../../assets/10FiveStarReviews.png";
import TwoStarReview from "../../assets/30FiveStarReviews.png";
import ThreeStarReview from "../../assets/50FiveStarReviews.png";
import OneInterested from "../../assets/15Interested.png";
import TwoInterested from "../../assets/30Interested.png";
import ThreeInterested from "../../assets/45Interested.png";
import HostMonth from "../../assets/hostOfTheMonth.png";
import MostViewedOffer from "../../assets/mostViewedOffer.png";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";
import { useTranslation } from "react-i18next";

export default function MyBadges() {
    const { t } = useTranslation();
    function gotIt(props: string){
        if (props=="HostMonth"){
            //if maior rating de todos os users
            return ("imgA")
            //else
            //return ("imgB")
        }
        if (props=="MostViewedOffer"){
            //if oferta do host mais visualizada que todas
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="OneOffersPublished"){
            //if host tem 5 ofertas ou mais
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="TwoOffersPublished"){
            //if host tem 15 ofertas ou mais
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="ThreeOffersPublished"){
            //if host tem 30 ofertas ou mais
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="OneStarReview"){
            //if host tem 10 ratings de 5 estrelas
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="TwoStarReview"){
            //if host tem 30 ratings de 5 estrelas
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="ThreeStarReview"){
            //if host tem 50 ratings de 5 estrelas
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="OneAddedFav"){
            //if oferta do host está em 5 favoritos
            return ("imgA")
            //else
            //return ("imgB")
        }
        if (props=="TwoAddedFav"){
            //if oferta do host está em 15 favoritos
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="ThreeAddedFav"){
            //if oferta do host está em 30 favoritos
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="OneInterested"){
            //if oferta do host está em 15 favoritos
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="TwoInterested"){
            //if oferta do host está em 30 favoritos
            //return ("imgA")
            //else
            return ("imgB")
        }
        if (props=="ThreeInterested"){
            //if oferta do host está em 45 favoritos
            //return ("imgA")
            //else
            return ("imgB")
        }
    }
    return (
        <div>
            <Navbar />
            <h1 className="label text-3xl">{t("yourBadges")}</h1>
            <div className="grid grid-cols-3 gap-5 ml-4">
                <div>
                    <img className={gotIt("HostMonth")} src={HostMonth}/>
                    <p className="label">{t("hostOfTheMonth")}</p>
                </div>
                <div>
                    <img className={gotIt("MostViewedOffer")} src={MostViewedOffer}/>
                    <p className="label">{t("mostViewedOffer")}</p>
                </div>
                <div>
                    <img className={gotIt("OneOffersPublished")} src={OneOffersPublished}/>
                    <p className="label">{t("fiveOffersPublished")}</p>
                </div>
                <div>
                    <img className={gotIt("TwoOffersPublished")} src={TwoOffersPublished}/>
                    <p className="label">{t("fifteenOffersPublished")}</p>
                </div>
                <div>
                    <img className={gotIt("ThreeOffersPublished")} src={ThreeOffersPublished}/>
                    <p className="label">{t("thirtyOffersPublished")}</p>
                </div>
                <div>
                    <img className={gotIt("OneStarReview")} src={OneStarReview}/>
                    <p className="label">{t("tenFiveStarReviews")}</p>
                </div>
                <div>
                    <img className={gotIt("TwoStarReview")} src={TwoStarReview}/>
                    <p className="label">{t("fifteenFiveStarReviews")}</p>
                </div>
                <div>
                    <img className={gotIt("ThreeStarReview")} src={ThreeStarReview}/>
                    <p className="label">{t("thirtyFiveStarReviews")}</p>
                </div>
                <div>
                    <img className={gotIt("OneAddedFav")} src={OneAddedFav}/>
                    <p className="label">{t("fiveTimesAddedToFavourites")}</p>
                </div>
                <div>
                    <img className={gotIt("TwoAddedFav")} src={TwoAddedFav}/>
                    <p className="label">{t("fifteenTimesAddedToFavourites")}</p>
                </div>
                <div>
                    <img className={gotIt("ThreeAddedFav")} src={ThreeAddedFav}/>
                    <p className="label">{t("thirtyTimesAddedToFavourites")}</p>
                </div>
                <div>
                    <img className={gotIt("OneInterested")} src={OneInterested}/>
                    <p className="label">{t("fifteenPeopleInterested")}</p>
                </div>
                <div>
                    <img className={gotIt("TwoInterested")} src={TwoInterested}/>
                    <p className="label">{t("thirtyPeopleInterested")}</p>
                </div>
                <div>
                    <img className={gotIt("ThreeInterested")} src={ThreeInterested}/>
                    <p className="label">{t("fourtyFivePeopleInterested")}</p>
                </div>

            </div>
            <div className="fixed bottom-0 right-0 z-50">
                <Chat />
            </div>
            <Footer />
        </div>
    )
}