import React from "react";
import "./register.css";
import { GoogleLogin } from "react-google-login";
import googleLogo from "../../assets/google.png";
import { SHA256 } from "crypto-js";
import { SignUp as apiSignUp, SignInWithGoogle } from "../../_services/api";
import { Link, Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import querystring from "../../_services/helper";
import BlueLogo from "../../assets/logoDarkblue.png";
import i18n from "../../i18nextConf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircleLoader from "react-spinners/CircleLoader";

interface IAccountInfoState {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  continue: boolean | null;
  loading: boolean;
}

class Register extends React.Component<{ t: any }, IAccountInfoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      continue: null,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Hanlde events
  handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newState = { [name]: value } as Pick<
      IAccountInfoState,
      keyof IAccountInfoState
    >;
    this.setState(newState);
  }

  //----------------------------------------------------------------------------------------------

  handleSubmit(event: any) {

    /*
    para utilizar as traduções dentro do toast (library utilizada para feedback) é necessario
    inicializar os pedaços de texto antes de os utilizar
    */
    const possibleFeedbacks = {
      fillAllFieldsFeedback: i18n.t("fillAllFieldsFeedback"),
      createdAccountFeedback: i18n.t("createdAccountFeedback"),
      errorFeedback: i18n.t("errorFeedback"),
      differentPasswordFeedback: i18n.t("differentPasswordFeedback"),
    };

    const feebackBoxStyling = {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      draggable: true,
    }

    const fillAllFieldsFeedback = () => toast.dark(possibleFeedbacks.fillAllFieldsFeedback, feebackBoxStyling);
    const createdAccountFeedback = () => toast.dark(possibleFeedbacks.createdAccountFeedback, feebackBoxStyling);
    const errorFeedback = () => toast.dark(possibleFeedbacks.errorFeedback, feebackBoxStyling);
    const differentPasswordFeedback = () => toast.dark(possibleFeedbacks.differentPasswordFeedback, feebackBoxStyling);

    if (
      this.state?.username === "" ||
      this.state?.email === "" ||
      this.state?.password === "" ||
      this.state?.repeatPassword === ""
    ) {
      fillAllFieldsFeedback();
    }

    if (this.state.password === this.state.repeatPassword) {
      this.signup(this.state.username, this.state.email, this.state.password)
        .then((res) => {
          this.setState({ continue: true });
          //mandar para a parte do complete profile e dizer que a criaçao foi bem sucedida
          createdAccountFeedback();
        })
        .catch((err) => {
          errorFeedback();
        });
    } else {
      differentPasswordFeedback();
    }
    event.preventDefault();
  }
  //----------------------------------------------------------------------------------------------

  // Promise handling request to api
  signup(username: string, email: string, password: string) {
    this.setState({loading: true});
    let promise = new Promise((resolve, reject) => {
      let passwordHash = SHA256(password);
      apiSignUp(username, email, passwordHash.toString())
        .then((response) => {
          this.setState({loading: false});
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          this.setState({loading: false});
          reject();
        });
    });
    return promise;
  }

  // Google login
  responseGoogle = (response: any) => {
    SignInWithGoogle(response.Aa, response.Ft.Ve, response.Ft.pu)
      .then(res => {
        this.setState({ continue: true });
      })
      .catch(err => console.log(err))
  };

  // Render webpage
  render() {
    const redirectLink = querystring("redirect", true);
    if (this.state.continue) {
      return (
        <Redirect
          to={
            redirectLink === "" || redirectLink === null
              ? "/login"
              : "/login" + redirectLink
          }
        />
      );
    } else {
      const { t } = this.props;
      return (
        <div className="registerPage bg-main flex justify-center text-center">
          <div className="md:w-3/6 m-auto">
            <Link to="/">
              <h1 className="text-8xl font-bold text-white">
                <div className="content-center inline-block">
                  <img className="h-50 w-auto" src={BlueLogo} alt="Logo" />
                </div>
              </h1>
            </Link>
            <form onSubmit={this.handleSubmit}>
              <label className="leftLabel">
                {t("username")}
              </label>
              <input
                className="form-input mt-8 block w-full border-3 text-dark_blue border-darker_blue placeholder-dark_blue rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-salmon focus:outline-none focus:bg-beige_a_morrer focus:text-darker_blue focus:ring-0 focus:border-transparent"
                name="username"
                type="text"
                placeholder={t("username")}
                onChange={this.handleChange}
              />
              <label className="leftLabel">
                {t("email")}
              </label>
              <input
                className="form-input mt-8 block w-full border-3 text-dark_blue border-darker_blue placeholder-dark_blue rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-salmon focus:outline-none focus:bg-beige_a_morrer focus:text-darker_blue focus:ring-0 focus:border-transparent"
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={this.handleChange}
              />
              <label className="leftLabel">
                {t("password")}
              </label>
              <input
                className="form-input mt-8 block w-full border-3 text-dark_blue border-darker_blue placeholder-dark_blue rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-salmon focus:outline-none focus:bg-beige_a_morrer focus:text-darker_blue focus:ring-0 focus:border-transparent"
                name="password"
                type="password"
                placeholder={t("password")}
                onChange={this.handleChange}
              />
              <label className="leftLabel">
                {t("repeat-password")}
              </label>
              <input
                className="form-input mt-8 block w-full border-3 text-dark_blue border-darker_blue placeholder-dark_blue rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-salmon focus:outline-none focus:bg-beige_a_morrer focus:text-darker_blue focus:ring-0 focus:border-transparent"
                name="repeatPassword"
                type="password"
                placeholder={t("repeat-password")}
                onChange={this.handleChange}
              />
              {/*
              O BUTAO NAO PODE TER LINK DIRETO PARA O COMPLETE REGISTER
              É NECESSARIO QUE VERIFIQUE SE TODOS OS CAMPOS ESTAO PREENCHIDOS E SO SE O REGISTER ESTIVER COMPLETO E VALIDO É QUE DEVE LEVAR PARA O COMPLETE REGISTER
              */}
              <div style={{marginLeft:-130}}>
                <CircleLoader color='#ffffff' loading={this.state.loading} size={150} />
              </div>
              <button
                type="submit"
                className="w-full block mt-12 text-white  bg-dark_blue font-bold text-2xl rounded-full pt-1 pb-2 focus:outline-none hover:bg-opacity-80 hover:bg-salmon hover:text-darker_blue"
              >
                {t("sign-up")}
              </button>
            </form>
            <div className="text-white separator pt-4 mb-6 pl-4 pr-4">
              {t("sign-up-with")}
            </div>
            <GoogleLogin
              clientId="435001531571-aolerdljkcbrobj2qarsk6u9f87i3nrh.apps.googleusercontent.com"
              jsSrc="https://apis.google.com/js/platform.js"
              render={(renderProps) => (
                <button
                  className="rounded-full w-14 h-14 bg-white mx-auto focus:outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    className="w-12 h-12 mx-auto"
                    src={googleLogo}
                    alt="Sign in with Google"
                  />
                </button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <p className="text-white mt-6">
              {t("have-account")}&nbsp;
              <Link
                className="font-bold underline"
                to={
                  redirectLink === "" || redirectLink === null
                    ? "/login"
                    : "/login" + redirectLink
                }
              >
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
}

export default compose<React.ComponentType<any>>(withTranslation())(Register);
