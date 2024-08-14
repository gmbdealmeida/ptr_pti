import React from "react"
import "./search.css"

import Navbar from "../../components/Navbar/Navbar";
import HouseList from "../../components/HouseList/HouseList";
import ServiceList from "../../components/ServiceList/ServiceList";
import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../assets/svgs/search.svg";
import Chat from "../../components/Chat/Chat";
import { withTranslation } from "react-i18next";
import { VscSettings } from "react-icons/vsc";
import { Swiper } from 'swiper/react';
import InfiniteScroll from "react-infinite-scroll-component";

import 'swiper/swiper.min.css';
import { GetAllHouses, GetHousesWithFilter } from "../../_services/api";
import CircleLoader from "react-spinners/CircleLoader";
import IsAuthenticated from "../../_services/Authenticator";
const queryString = require('query-string');

interface SwiperElement extends Element {
    swiper: any; // can't assign Type because Swiper doesn't extends SwiperClass.d.ts where slidePrev is 
}

interface ISearchState {
    openMenu: boolean;
    accountType: string | null;
    houses: any[];
    loading: boolean;
    items: any;
    hasMore: boolean;
}

class Search extends React.Component<{ t: any }, ISearchState> {

    constructor(props: any) {
        super(props)

        this.state = {
            openMenu: false,
            accountType: "Student",
            houses: [],
            loading: false, 
            items: [],
            hasMore: true
        }

        this.MenuToggle = this.MenuToggle.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true})
        this.setState({"accountType": localStorage.getItem("accountType")})
        localStorage.getItem("authenticated")==="true" && IsAuthenticated()
        if(this.state.accountType === "Student") {
            let search = window.location.search.substring(1)
            if(search !== "") {
                let paramsIndex = {
                    address: "address", location: "location", coordinates: "coordinates",
                    rent: "rent", maxPeopleNum: "maxPeopleNum", roomsNum: "roomsNum",
                    area: "area", houseType: "HouseType", spaceType: "SpaceType",
                    description: "description", houseRules: "HouseRules", dateAvailable: "dateAvailable",
                    commodities: "Commodities", installations: "Installations"
                }
                let params = queryString.parse(window.location.search)
                let filter = []
                for (const [, value] of Object.entries(paramsIndex)) {
                    if(typeof(params[value])==="object") {
                        filter.push(params[value].join(" "))
                    } else if(params[value]?.length > 0){
                        filter.push(params[value])
                    } else {
                        filter.push(undefined)
                    }
                }
                GetHousesWithFilter(...filter)
                    .then(res => {
                        let housesArr = []
                        if(typeof res.data === "object") {
                            for (var key in res.data) {
                                if (res.data.hasOwnProperty(key)) {
                                    housesArr.push( res.data[key] );
                                }
                            }
                        } else {
                            housesArr = res.data
                        }
                        this.setState({houses: housesArr})
                        if(housesArr.length > 5) {
                            this.setState({items: housesArr.slice(0,5)})
                        } else {
                            this.setState({items: housesArr.slice(0,-1)})
                        }
                        this.setState({loading: false})
                    })
                    .catch(err => {
                        this.setState({loading: false})
                        console.log(err)
                    })
            } else {
                this.setState({loading: true})
                GetAllHouses()
                    .then(res => {
                        let housesArr = []
                        if(typeof res.data.houses === "object") {
                            for (var key in res.data.houses) {
                                if (res.data.houses.hasOwnProperty(key)) {
                                    housesArr.push( res.data.houses[key] );
                                }
                            }
                        } else {
                            housesArr = res.data.houses
                        }
                        this.setState({houses: housesArr})
                        this.setState({loading: false})
                        if(housesArr.length > 5) {
                            this.setState({items: housesArr.slice(0,5)})
                        } else {
                            this.setState({items: housesArr.slice(0,-1)})
                        }
                        this.setState({loading: false})
                    })
                    .catch(err => {
                        this.setState({loading: false})
                        console.log(err)
                    })
            }
        }
    }

    menuButton = document.getElementsByClassName('menu-button');

    MenuToggle() {
        const swiper = (document.getElementsByClassName('swiper-container') as HTMLCollectionOf<SwiperElement>)[0].swiper;
        if (this.state.openMenu === false) {
            swiper.slidePrev();
            this.setState({ "openMenu": true });
        } else {
            swiper.slideNext();
            this.setState({ "openMenu": false });
        }
    }

    fetchMoreData = () => {
        if(this.state.items.length >= this.state.houses.length) {
            this.setState({hasMore: false})
            return
        }

        if( this.state.houses.length - this.state.items.length > 4) {
            this.setState({ items: this.state.items.concat(this.state.houses.slice(this.state.items.length, this.state.items.length + 4)) });
        } else {
            this.setState({ items: this.state.items.concat(this.state.houses.slice(this.state.items.length)) });
        }
    }

    whatToShow(session: string, loading: boolean) {
        if(loading) {
            return (
                <div>Loading...</div>
            )
        } else {
            if (session === "ServiceProvider") {
                window.location.href = "./profile";
            }
            else if (session === "Host") {
                return (
                    <div>
                        <ServiceList id="1" title="Limpezas da Fernanda" location="Benfica" providerName="Fernanda Aurora" description="Limpeza de apartamentos com produtos pagos." price="7" rating="5" lists={["Casas bonitas", "Casas com varanda", "Quartos azuis"]}  daysOff={(["monday", "sunday"])} dateAvailable="2021-02-09" maxHourDay="6"  minHourDay="2" serviceType="Cleaner" />
                        <ServiceList id="2" title="Cozinheiro multi-culturas" location="Ajuda" providerName="Nwabudike Biboa" description="Cozinho pratos de todas as culturas." price="10" rating="4" lists={["Casas bonitas", "Casas com varanda", "Quartos azuis"]}  daysOff={(["saturday", "wednesday", "friday"])} dateAvailable="2021-04-09" maxHourDay="6" minHourDay="2" serviceType="Cook" />
                        <ServiceList id="3" title="Eletricista experiente" location="Campo Grande" providerName="Sérgio Palma" description="Resolvo problemas elétricos de todos os tipos." price="8" rating="3" lists={["Casas bonitas", "Casas com varanda", "Quartos azuis"]} daysOff={(["thursday", "tuesday"])} dateAvailable="2021-02-09" maxHourDay="6" minHourDay="2" serviceType="Electrician" />
                        <ServiceList id="4" title="Canalizador Alvalade" location="Alvalade" providerName="Tiago Feno" description="Resolvo problemas de canalização e construo canalização nova." price="6" rating="2" lists={["Casas bonitas", "Casas com varanda", "Quartos azuis"]} daysOff={(["monday", "tuesday"])} dateAvailable="2021-02-09" maxHourDay="6" minHourDay="2" serviceType="Plumber" />
                        <ServiceList id="5" title="Jardineira de vivendas" location="Cascais" providerName="Margarida Ruas" description="Arranjo todo o tipo de espeço exterior de vivendas." price="12" rating="1" lists={["Casas bonitas", "Casas com varanda", "Quartos azuis"]} daysOff={(["sunday"])} dateAvailable="2021-02-09" maxHourDay="6" minHourDay="2" serviceType="Gardener" />
                        <ServiceList id="6" title="Limpador de janelas" location="Lisboa Centro" providerName="Vasco Silva" description="Limpo todas as janelas." price="9" rating="0" lists={["Casas bonitas", "Casas com varanda", "Quartos azuis"]} daysOff={([])} dateAvailable="2021-02-09" maxHourDay="6" minHourDay="2" serviceType="Window Cleaner" />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading infinite...</h4>}
                        >
                            {this.state.items.map((i: any, index: any) => (
                                <HouseList id={i.id} name={i.title} location={i.location} address={i.address} description={i.description} rent={i.rent} maxPeopleNum={i.maxPeopleNum} rating={parseFloat(i.rating)} houseType={i.houseType} spaceType={i.spaceType} hostId={i.hostId} roomsNum={i.roomsNum} commodities={(i.commodities.split(" "))} dateAvailable={i.dateAvailable} area={i.area} installations={(i.installations.split(" "))} houseRules={(i.houseRules)} closeServices={i.closeServices} pictures={(i.pictures.split(" "))}/>
                            ))}
                        </InfiniteScroll>
                    </div>
                )
            }
        }
    }
    
    render() {
        const { t } = this.props


        return (
            <div>
                <Navbar />
                <div style={{position: 'absolute', left: '45%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                    <CircleLoader color='#cccccc' loading={this.state.loading} size={150} />
                </div>
                <Swiper
                    className="swiper-container"
                    slidesPerView="auto"
                    initialSlide={1}
                    slideToClickedSlide={true}

                    allowTouchMove={false}
                    preventClicks={false}
                    preventClicksPropagation={false}
                    touchStartPreventDefault={false}
                    simulateTouch={false}

                >
                    <div className="swiper-wrapper mt-4">
                        <div className="swiper-slide menu">
                            <Filter />
                        </div>
                        <div className="swiper-slide content">
                            <div className="menu-button" onClick={this.MenuToggle} >
                                <VscSettings size={32} />
                            </div>
                            {this.whatToShow(this.state.accountType as string, this.state.loading)}
                        </div>
                    </div>

                </Swiper>
                { localStorage.getItem("authenticated")==="true" && (
                    <div className="fixed bottom-0 right-0 z-50">
                        <Chat />
                    </div>
                )}
                <Footer />

            </div>
        )
    }
}

export default withTranslation()(Search)
