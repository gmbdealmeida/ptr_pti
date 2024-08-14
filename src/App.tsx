import React from "react";
import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./routes/welcome-page/welcome";
import Register from "./routes/register-page/register";
import Login from "./routes/login-page/login";
import Profile from "./routes/profile-page/profile";
import Home from "./routes/home-page/home";
import Search from "./routes/search-page/search";
import House from "./routes/house-page/house";
import AuthenticatedRoute from "./components/Authenticated-Route/Authenticated-Route";
import UnauthenticatedRoute from "./components/Unauthenticated-Route/Unauthenticated-Route";
import NotFound from "./routes/notFound-page/notFound";
import CreateHouse from "./routes/createHouse-page/createHouse";
import CompleteRegister from "./routes/completeRegister-page/completeRegister";
import Admin from "./routes/admin-page/admin";
import FirstAdmin from "./routes/firstAdmin-page/firstAdmin";
import CreateService from "./routes/createService-page/createService";
import Service from "./routes/service-page/service";
import Payment from "./routes/payment-page/payment";
import Contract from "./routes/contract-page/contract";
import SuccessfulPayment from "./routes/successfulPayment-page/successfulpayment";
import AllOffersAdmin from "./routes/allOffersAdmin-page/allOffersAdmin";
import MyBadges from "./routes/myBadges-page/myBadges";
import IncompleteOffersAdmin from "./routes/incompleteOffersAdmin-page/incompleteOffersAdmin";
import AllContractsAdmin from "./routes/allContractsAdmin-page/allContractsAdmin";
import AllUsersAdmin from "./routes/allUsersAdmin-page/allUsersAdmin";
import StatisticsAdmin from "./routes/statisticsAdmin-page/statisticsAdmin";
import AllMyOffers from "./routes/allMyOffers-page/allMyOffers";
import AllMyRenters from "./routes/allMyRenters-page/allMyRenters";
import AllMyServiceProviders from "./routes/allMyServiceProviders-page/allMyServiceProviders";
import Privacy from "./routes/privacy-page/privacy";
import Transactions from './routes/transactions-page/transactions';
import Interest from './routes/interest-page/interest';
import PageUnderConstruction from "./routes/page-under-construction/page-under-construction";
import MyCurrentRental from "./routes/myCurrentRental-page/myCurrentRental";

class App extends React.Component<{}> {
    render() {
        /**
         * First we have normal routes
         * Unauthenticated Routes
         * Authenticated Routes
         * https://serverless-stack.com/chapters/use-the-redirect-routes.html
         */

        /* 
    Para ver o profile sem estar autenticado mudar a linha do "/profile" para UnauthenticatedRoute em vez de Authenticated
    Mudar de novo para Authenticated na parte do "/profile" ANTES DE DAR COMMIT
    */
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/search" exact component={Search} />
                    <Route path="/house" exact component={House} />
                    <Route path="/privacy" exact component={Privacy} />

                    <UnauthenticatedRoute path="/register" exact>
                        <Register />
                    </UnauthenticatedRoute>

                    <UnauthenticatedRoute path="/login" exact>
                        <Login />
                    </UnauthenticatedRoute>

                    <AuthenticatedRoute path="/allMyServiceProviders" exact>
                        <AllMyServiceProviders />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/allMyRenters" exact>
                        <AllMyRenters />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/myCurrentRental" exact>
                        <MyCurrentRental/>
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/allMyOffers" exact>
                        <AllMyOffers />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/myBadges" exact>
                        <MyBadges />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/successfulPayment" exact>
                        <SuccessfulPayment />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/contract" exact>
                        <Contract />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/payment" exact>
                        <Payment />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/service" exact>
                        <Service />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/createService" exact>
                        <CreateService />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/statistics" exact>
                        <StatisticsAdmin />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/allUsersAdmin" exact>
                        <AllUsersAdmin />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/allContracts" exact>
                        <AllContractsAdmin />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/incompleteOffersAdmin" exact>
                        <IncompleteOffersAdmin />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/allOffersAdmin" exact>
                        <AllOffersAdmin />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/admin" exact>
                        <Admin />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/completeRegister" exact>
                        <CompleteRegister />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/createHouse" exact>
                        <CreateHouse />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/home" exact>
                        <Home />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/profile" exact>
                        <Profile />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/transactions" exact>
                        <Transactions />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/interest" exact>
                        <Interest />
                    </AuthenticatedRoute>

                    <UnauthenticatedRoute path="/pageUnderConstruction" exact>
                        <PageUnderConstruction />
                    </UnauthenticatedRoute>

                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
