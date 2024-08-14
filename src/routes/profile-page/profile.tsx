import React from "react";
import "./profile.css";
import profilePicture from "../../assets/blank-profile-picture.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chat from "../../components/Chat/Chat";
import EditPopup from "../../components/EditPopup/EditPopup";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import { withTranslation } from "react-i18next";
import { MdNotificationsActive } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri";
import { GiPadlock, GiBroom } from "react-icons/gi";
import { BiBuildingHouse, BiListPlus, BiUserPlus } from "react-icons/bi";
import { IoPeopleCircleOutline, IoPeople } from "react-icons/io5";
import { BsBookmarkFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { ImCamera } from "react-icons/im";
import { HiPencilAlt } from "react-icons/hi";
import { FaFileContract, FaHeart } from "react-icons/fa";
import Popup from "reactjs-popup";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { LogOut } from "../../_services/Authenticator";
import CircleLoader from "react-spinners/CircleLoader";
import BookPopup from "../../components/BookPopup/BookPopup";
import {
  GetContractById,
  GetContractByUserId,
  GetHouseById,
  GetUserById,
} from "../../_services/api";

interface IHouse {
  address: string;
  area: number;
  closeServices: string;
  commodities: string;
  coordinates: string;
  created_at: string;
  dateAvailable: string;
  description: string;
  hostId: number;
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
  loading: boolean;
}

interface IHost {
  id: string;
  name: string;
  email: string;
  username: string;
  accountType: string;
  birthDate: string;
  bankAccountNumber: string; //retirar depois de dar update a k8s
  rating: string;
  timesRated: number;
  cellphoneNumber: string;
  address: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

interface IProfileState {
  currentFile: any;
  previewImage: any;
  name: string;
  accountType: string | null;
  address: string;
  avatar: string;
  bankAccountNumber: string;
  birthDate: string;
  cellphoneNumber: string;
  created_at: string;
  email: string;
  id: number | null;
  rating: string;
  timesRated: 0;
  updated_at: string;
  username: string;
  loading: boolean;
  hostState: IHost | null;
  houseState: IHouse | null;
  contractId: number | null;
}

class Profile extends React.Component<{ t: any }, IProfileState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentFile: undefined,
      previewImage: profilePicture,
      name: "",
      accountType: "",
      address: "",
      avatar: "",
      bankAccountNumber: "",
      birthDate: "",
      cellphoneNumber: "",
      created_at: "",
      email: "",
      id: null,
      rating: "",
      timesRated: 0,
      updated_at: "",
      username: "",
      loading: false,
      hostState: null,
      houseState: null,
      contractId: null
    };
    this.selectFile = this.selectFile.bind(this);
  }
  password = "*********";

  update(data: IProfileState) {
    this.setState(data);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ accountType: localStorage.getItem("accountType") });
    localStorage.getItem("userData") &&
      this.setState(JSON.parse(localStorage.getItem("userData") as string));
    setTimeout(() => {
      this.setState({ loading: false });
    }, 700);

    GetContractByUserId(
      JSON.parse(localStorage.getItem("userData") as string).id.toString()
    ).then((res) => {
      if(res.data[1].contractsAsStudent.length > 0) {
        this.setState({"contractId": res.data[1].contractsAsStudent[0].contractId})
        console.log("CONTRACT: "+ this.state.contractId)
        GetContractById(res.data[1].contractsAsStudent[0].contractId)
          .then(rescid => {
            GetHouseById(rescid.data[0].contract.houseId)
              .then((res) => {
                this.setState({ houseState: res.data.house as IHouse });
                GetUserById(res.data.house.hostId)
                  .then((hostData: any) => {
                    this.setState({ hostState: hostData.data.user as IHost });
                  })
                  .catch((err: any) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => console.log(err))
        
      }
    });
  }

  selectFile(event: any) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
    });
  }

  onEdit(value: string, state: any, id: any, translate: any) {
    const { t } = translate;
    //edit popup
    return (
      <div>
        <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3 ">
          {t(value)}:{" "}
        </p>
        <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline mx-3">
          {state}
        </p>

        <Popup
          modal
          trigger={
            <button className="editBtn mb-5 inline" type="button">
              <HiPencilAlt title={t("edit")} />
            </button>
          }
          position="top center"
          className="edit"
          closeOnDocumentClick
        >
          {/* ALTERAR ID PARA SESSION DO ID DO USER ---------------------------------------- */}
          <EditPopup
            value={value}
            id={id}
            updateData={(data: IProfileState) => {
              this.update(data);
            }}
          />
        </Popup>
      </div>
    );
  }

  whatToShow1(session: string, translate: any) {
    const { t } = translate;
    if (session == "Host") {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-2 row-end-3">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("account")}
            </h1>
            <div>
              <MdNotificationsActive
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("notifications")}
              </p>
            </div>
            <Link to="./myBadges">
              <div>
                <RiMedalLine
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("badges")}
                </p>
              </div>
            </Link>
            <Link to="./privacy">
              <div>
                <GiPadlock
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("privacy")}
                </p>
              </div>
            </Link>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs  hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("activities")}
            </h1>
            <div>
              <FaFileContract
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("contracts")}
              </p>
            </div>
            <div>
              <MdPayment
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("transactions")}
              </p>
            </div>
          </div>
        </div>
      );
    } else if (session == "Student") {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-2 row-end-3">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("account")}
            </h1>
            <div>
              <MdNotificationsActive
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("notifications")}
              </p>
            </div>
            {/* <Link to="./myBadges"><div><RiMedalLine size={30} className={'ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white'} /> <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">{t("badges")}</p></div></Link> */}
            <Link to="./privacy">
              <div>
                <GiPadlock
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("privacy")}
                </p>
              </div>
            </Link>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs  hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("activities")}
            </h1>
            <div>
              <FaHeart
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("favourites")}
              </p>
            </div>
            <div>
              <Link to="./interest">
                <BsBookmarkFill
                  size={30}
                  className={
                    "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("insterestedAccommodation")}
                </p>
              </Link>
            </div>
            <div>
              <Link to="./transactions">
                <MdPayment
                  size={30}
                  className={
                    "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("transactions")}
                </p>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-2 row-end-3">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("account")}
            </h1>
            <div>
              <MdNotificationsActive
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("notifications")}
              </p>
            </div>
            <Link to="./privacy">
              <div>
                <GiPadlock
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("privacy")}
                </p>
              </div>
            </Link>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs  hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("activities")}
            </h1>
            <div>
              <FaFileContract
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("contracts")}
              </p>
            </div>
            <div>
              <Link to="./transactions">
                <MdPayment
                  size={30}
                  className={
                    "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("transactions")}
                </p>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  whatToShow2(session: string, translate: any) {
    const { t } = translate;
    if (session == "Host") {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-3 row-end-4">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("all")}
            </h1>
            <Link to="./allMyOffers">
              <div>
                <BiBuildingHouse
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("myOffers")}
                </p>
              </div>
            </Link>
            <Link to="./allMyRenters">
              <div>
                <IoPeopleCircleOutline
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("myRenters")}
                </p>
              </div>
            </Link>
            <Link to="./allMyServiceProviders">
              <div>
                <GiBroom
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("myProviders")}
                </p>
              </div>
            </Link>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs  hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("add")}
            </h1>
            <Link to="./createHouse">
              <div>
                <BiListPlus
                  size={30}
                  className={
                    "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("addOffer")}
                </p>
              </div>
            </Link>
            {/* <div>
                            <BiUserPlus
                                size={30}
                                className={
                                    "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                                }
                            />
                            <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                                {t("addAccount")}
                            </p>
                        </div> */}
          </div>
        </div>
      );
    } else if (session == "Student") {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-3 row-end-4">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <Link to="./myCurrentRental">
              <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
                {t("myCurrentRental")}
              </h1>
            </Link>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("myPreviousRentals")}
            </h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-3 row-end-4">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("all")}
            </h1>
            <Link to="">
              <div>
                <GiBroom
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("myOffers")}
                </p>
              </div>
            </Link>
            <Link to="">
              <div>
                <IoPeople
                  size={30}
                  className={
                    "ml-3 mr-1 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />{" "}
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("myBosses")}
                </p>
              </div>
            </Link>
          </div>
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs  hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("add")}
            </h1>
            <Link to="./createService">
              <div>
                <BiListPlus
                  size={30}
                  className={
                    "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                  }
                />
                <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                  {t("addService")}
                </p>
              </div>
            </Link>
            <div>
              <BiUserPlus
                size={30}
                className={
                  "ml-3 mr-2 mb-3 mt-1 inline text-gray-500 group-hover:text-white"
                }
              />
              <p className="text-gray-500 font-medium group-hover:text-white group-hover:text-opacity-75 mb-5 inline m-3">
                {t("addAccount")}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  whatToShow3(session: string, translate: any) {
    const { t } = translate;
    if (session == "Host") {
      //nada
    } else if (session == "Student") {
      return (
        <div className="grid grid-cols-2 gap-4 col-start-3 col-end-10 row-start-4 row-end-5">
          <Popup
            modal
            trigger={
              <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg cursor-pointer">
                <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
                  {t("newPayment")}
                </h1>
              </div>
            }
            position="top center"
          >
            <BookPopup 
                price={this.state.houseState?.rent}
                pop={"payment"}
                title={this.state.houseState?.title}
                name={this.state.hostState?.name}
                ownerName={this.state.hostState?.name}
                ownerId={this.state.hostState?.id}
                address={this.state.houseState?.address}
                rules={this.state.houseState?.houseRules}
                houseId={this.state.houseState?.id}
                ownerEmail={this.state.hostState?.email}
                type={"old"}
                ownerPhone={this.state.hostState?.cellphoneNumber}
                contractId={this.state.contractId}
            />
          </Popup>

          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("addAccount")}
            </h1>
          </div>
        </div>
      );
    } else {
      //nada
    }
  }

  render() {
    const { t } = this.props;
    const { currentFile, previewImage } = this.state;

    return (
      <div className="bg-beige_a_morrer">
        <Navbar />
        <div
          style={{
            position: "absolute",
            left: "45%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircleLoader
            color="#ffffff"
            loading={this.state.loading}
            size={150}
          />
        </div>
        <div id="profilePic">
          {this.state.avatar !== "" ? (
            <div className="profImg flex justify-center ">
              <div className="mb-12">
                <img
                  className="preview w-40 h-40 border-2 border-white rounded-full"
                  src={this.state.avatar}
                  alt=""
                />
                <label htmlFor="upload" className="cursor-pointer">
                  <ImCamera className="ml-28 -mt-10 text-4xl" />
                </label>
              </div>
            </div>
          ) : (
            previewImage && (
              <div className="profImg flex justify-center ">
                <div className="mb-12">
                  <img
                    className="preview w-40 h-40 border-2 border-white rounded-full"
                    src={previewImage}
                    alt=""
                  />
                  <label htmlFor="upload" className="cursor-pointer">
                    <ImCamera className="ml-28 -mt-10 text-4xl" />
                  </label>
                </div>
              </div>
            )
          )}
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={this.selectFile}
          />
        </div>
        <div className="grid grid-flow-col grid-cols-11 grid-rows-11 md:grid-flow-col">
          <div className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent mr-3 col-start-3 col-end-10 row-start-1 row-end-2 rounded-lg">
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("profileInfo")}
            </h1>
            {this.onEdit(
              "fullName",
              this.state.name,
              this.state.id,
              this.props
            )}
            {this.onEdit(
              "birthday",
              this.state.birthDate,
              this.state.id,
              this.props
            )}
            {this.onEdit(
              "phoneNum",
              this.state.cellphoneNumber,
              this.state.id,
              this.props
            )}
            {this.onEdit(
              "address",
              this.state.address,
              this.state.id,
              this.props
            )}
            {this.onEdit(
              "cardNum",
              this.state.bankAccountNumber,
              this.state.id,
              this.props
            )}
            {this.onEdit("password", this.password, this.state.id, this.props)}
          </div>
          {this.whatToShow1(this.state.accountType as string, this.props)}
          {this.whatToShow2(this.state.accountType as string, this.props)}
          {this.whatToShow3(this.state.accountType as string, this.props)}
          <Link
            to="./login"
            className="group border-2 border-opacity-75 border-gray-500 hover:bg-dark_blue hover:shadow-xs hover:border-transparent m-3 col-start-3 col-end-10 row-start-5 row-end-6 rounded-lg"
            onClick={() => {
              LogOut();
            }}
          >
            <h1 className="text-gray-900 text-xl font-semibold group-hover:text-white m-3">
              {t("logOut")}
            </h1>
          </Link>
        </div>
        <div className="fixed bottom-0 right-0 z-50">
          <Chat />
        </div>
        <Footer />
      </div>
    );
  }
}

export default compose<React.ComponentType<any>>(withTranslation())(Profile);
