import React, {useState, useEffect} from "react";
import "./successfulPayment.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";
import { Link } from "react-router-dom";
import { BiBadgeCheck } from "react-icons/bi";
import search from "../../routes/search-page/search"
import { useTranslation } from "react-i18next";

export default function SuccessfulPayment() {
    const { t } = useTranslation();
    setTimeout(function() {
        window.location.replace('/search');
      }, 9000);

    const [seconds, setSeconds] = useState(9);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } 
    });

    return (
        <div className="bg-main">
            <Navbar />
            <div className="containerP">
                <h1 className="text-base xs:text-xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl font-semibold w-3/4 inline">{t("paymentSuccessful")}</h1>
                <BiBadgeCheck size={64} className="inline ml-2" />
                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold my-2">{t("reciptOnAccount")}</p>
                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold inline">{t("also")}</p>
                <Link to="/transactions" ><a className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold text-salmon inline">{t("transactionPageCont")}</a></Link>
                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold inline">{t("onYourProfile")}</p>
                <p className="text-base xs:text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold mt-2">{t("redirected")} {seconds} {t("seconds")}.</p>
            </div>
            <div className="fixed bottom-0 right-0 z-50">
                <Chat />
            </div>
            <Footer />
        </div>

    )

}
