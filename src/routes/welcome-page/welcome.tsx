import React from "react";
import "./welcome.css";

import Navbar from "../../components/Navbar/Navbar";
import Search from "../../assets/svgs/search.svg";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

interface IWelcomeState {
    search: string;
    continue: boolean | null;
}

class Welcome extends React.Component<{ t: any }, IWelcomeState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            search: "",
            continue: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        const newState = { search: event.target.value } as Pick<
            IWelcomeState,
            keyof IWelcomeState
        >;
        this.setState(newState);
    }

    onSubmit(event: any) {
        this.setState({ continue: true });
        event.preventDefault();
    }

    render() {
        const { t } = this.props;
        if (this.state.continue) {
            return <Redirect to={"/search?location=" + this.state.search} />;
        }
        return (
            <div className="welcomePage h-screen bg-welcome">
                <Navbar />
                <div className="flex h-5/6">
                    <div className="m-auto w-3/4">
                        <div className="flex justify-center bg-white border border-black rounded-full px-4 py-2 min-w-min">
                            <div className="flex-none pt-2 mr-4 ml-3 sm:ml-0">
                                <img
                                    className="w-8 h-8"
                                    src={Search}
                                    alt="Search icon"
                                />
                            </div>
                            <Autocomplete
                                id="searchBar"
                                className="flex-1 border-none bg-white focus:ring-0"
                                apiKey={process.env.REACT_APP_GOOGLE}
                                onPlaceSelected={(place) => {
                                    place.address_components && this.setState({search: encodeURIComponent(place.address_components[0].long_name)})
                                    this.setState({continue: true})
                                }}
                                options={{
                                    types: ["geocode"],
                                    componentRestrictions: { country: "pt" },
                                }}
                                onChange={this.handleChange}
                            />
                            <button
                                onClick={this.onSubmit}
                                className="mr-3 sm:mr-0 ml-4 bg-salmon rounded-full px-6 py-3 text-white font-bold focus:outline-none focus:ring-0 focus:bg-dark_blue"
                                type="submit"
                            >
                                {t("search")}
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withTranslation()(Welcome);
