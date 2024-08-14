import React from "react";
import "./firstAdmin.css";
import Carousel from '../../components/Carousel/Carousel'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";

interface IFirstAdminState {
    future: any
}
/*
Este component só é visto pelo admin
*/
class FirstAdmin extends React.Component<{t: any}, IFirstAdminState>{
    constructor(props: any) {
        super(props)

        this.state = {
            future: "something"
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <Carousel filter="Most Popular"/>
                <Carousel filter="Top Rated"/>
                <Carousel filter="New Arrivals" />
                <div className="fixed bottom-0 right-0 z-50">
                    <Chat/>
                </div>
                <Footer />
            </div>
           
        )
    }
}

export default FirstAdmin;
