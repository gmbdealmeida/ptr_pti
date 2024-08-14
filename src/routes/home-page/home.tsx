import React, { Suspense } from "react";
import "./home.css";
import Carousel from '../../components/Carousel/Carousel'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { GetAllHouses } from "../../_services/api";
import CircleLoader from "react-spinners/CircleLoader";

interface IHomeState {
    houses: any
    accountType: boolean | null
    loading: boolean
}
/*
Este component só é visto por utilizadores autenticados
*/
class Home extends React.Component<{t: any}, IHomeState>{
    constructor(props: any) {
        super(props)

        this.state = {
            houses: null,
            accountType: null,
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        // localStorage.getItem("accountType") === "Admin" ? this.setState({accountType: true }) : this.setState({accountType: false })
        // console.log(this.state.accountType)
        // if (localStorage.getItem("accountType") === "Admin"){
        //     window.location.href = "./admin";
        // }
        if (localStorage.getItem("accountType") === "Host"){
            window.location.href = "./search";
        }
        
        GetAllHouses()
            .then((res) => {
                this.setState(res.data)
                this.setState({loading: false});
            })
            .catch((err) => {
                this.setState({loading: false});
                console.log(err)
            })
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <Navbar />
                <Suspense fallback={"Loading"}>
                    <Carousel filter="Most Popular" houses={this.state.houses} />
                    <Carousel filter="Top Rated" houses={this.state.houses} />
                    <Carousel filter="New Arrivals" houses={this.state.houses} />

                </Suspense>
                <div className="fixed bottom-0 right-0 z-50">
                    <Chat/>
                </div>
                <Footer />
                <div style={{position: 'absolute', left: '45%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                    <CircleLoader color='#cccccc' loading={this.state.loading} size={150} />
                </div>
            </div>
           
        )
    }
}

export default compose<React.ComponentType<any>>(
    withTranslation()
  )(Home);
