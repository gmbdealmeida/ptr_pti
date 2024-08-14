import React from "react";
import "./admin.css";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import Navbar from "../../components/Navbar/Navbar";
import OptionAdminSwiper from "../../components/OptionAdminSwiper/OptionAdminSwiper";
import Footer from "../../components/Footer/Footer";
//Images
import AllOffers from "../../assets/Offers.png";
// import IncompleteOffers from "../../assets/incompleteOffer.png";
import AllUsers from "../../assets/allUsers.png";
import AllContracts from "../../assets/chats.png";
import Statistics from "../../assets/statistics.png";
//Assests
import users from "../../assets/users.png";
import chat from "../../assets/chat.png";
import graph from "../../assets/graph.png";

function Admin(props: any){ 
    const { t } = useTranslation();

    var ofertas = AllOffers;
    // var ofertasInc = IncompleteOffers;
    var todasUtil = AllUsers;
    var todosContratos = AllContracts;
    var estatistica = Statistics;

    const listOfImages = [ofertas, todasUtil, todosContratos, estatistica]
    const listOfNames = ["Todas as ofertas", "Todos utilizadores", "Todos os contratos", "Estatísticas"]
    const linkPage = ["/allOffersAdmin", "/allUsersAdmin", "/allContracts", "/statistics"]
    return (
        <div>
            <Navbar />
            <div className="mx-auto w-3/4">
                <OptionAdminSwiper pics={listOfImages} nameSlide={listOfNames} nameLink={linkPage} />
            </div>
            <Footer />
        </div>
    )
    
};

export default withTranslation()(Admin);