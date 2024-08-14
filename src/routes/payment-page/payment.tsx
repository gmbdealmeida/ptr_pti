import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./payment.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../contract-page/contract";
import successfulPayment from "../successfulPayment-page/successfulpayment";
//import ReactToPdf from "react-to-pdf";
import Dropzone from "react-dropzone";

import { AddTransaction, UpdateHouse, AddContract } from "../../_services/api";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaPaypal,
} from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import ReceiptPopup from "../../components/ReceiptPopup/ReceiptPopup";
import Popup from "reactjs-popup";
import moment from "moment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import i18n from "../../i18nextConf";

export default function Payment() {
  let props = useLocation<any>();
  const { t } = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [seenB, setSeenB] = useState(false);
  const [owner, setOwner] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [date, setDate] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const watchFields = watch(["cardNum", "address", "city", "zip"]);

  const feebackBoxStyling = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
    draggable: true,
    toastId: "You have an error in your form.",
  };
  console.log(props.state);

  let ownerClass = "font-bold text-lg ";
  let cardNumClass = "font-bold text-lg ";
  let expDateClass = "font-bold text-lg ";
  let cvvClass = "font-bold text-lg ";
  let addressClass = "font-bold text-lg ";
  let cityClass = "font-bold text-lg ";
  let zipClass = "font-bold text-lg ";

  if (errors.owner) {
    ownerClass += "text-maroon";
  } else {
    ownerClass += "text-dark_blue";
  }

  if (errors.cardNum) {
    cardNumClass += "text-maroon";
  } else {
    cardNumClass += "text-dark_blue";
  }

  if (errors.expDate) {
    expDateClass += "text-maroon";
  } else {
    expDateClass += "text-dark_blue";
  }

  if (errors.cvv) {
    cvvClass += "text-maroon";
  } else {
    cvvClass += "text-dark_blue";
  }

  if (errors.address) {
    addressClass += "text-maroon";
  } else {
    addressClass += "text-dark_blue";
  }

  if (errors.city) {
    cityClass += "text-maroon";
  } else {
    cityClass += "text-dark_blue";
  }

  if (errors.zip) {
    zipClass += "text-maroon";
  } else {
    zipClass += "text-dark_blue";
  }

  const possibleFeedbacks = {
    sucessPaymentFeedback: i18n.t("sucessPaymentFeedback"),
    errorFeedback: i18n.t("errorFeedback"),
  };

  const feebackBoxStyling2 = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    draggable: true,
  };

  const errorSubmit = () =>
    toast.dark("Error on submitting, please try again", feebackBoxStyling);
  const sucessPaymentFeedback = () =>
    toast.dark(possibleFeedbacks.sucessPaymentFeedback, feebackBoxStyling2);
  const errorFeedback = () =>
    toast.dark(possibleFeedbacks.errorFeedback, feebackBoxStyling2);
  // const errorAddressSubmit = () =>
  //     toast.dark("Please pick one of the addresses.", feebackBoxStyling);
  let sleepover = false;
  let parties = false;
  let pet = false;
  let smoke = false;
  if (props.state.type == "new") {
    const rules = props.state.rules.split(" ");
    if (rules.length > 0) {
      for (const value of rules) {
        if (value === "smoking") {
          smoke = true;
        }
        if (value === "pets") {
          pet = true;
        }
        if (value === "sleepovers") {
          sleepover = true;
        }
        if (value === "parties") {
          parties = true;
        }
      }
    }
  }else{
    console.log("Im old")
  }

  function sleepOver() {
    if (sleepover) {
      return ";3." + t("3yes");
    } else {
      return ";3." + t("3no");
    }
  }

  function party() {
    if (parties) {
      return ";4." + t("4yes");
    } else {
      return ";4." + t("4no");
    }
  }

  function pets() {
    if (pet) {
      return ";11." + t("11yes");
    } else {
      return ";11." + t("11no");
    }
  }

  function smoking() {
    if (smoke) {
      return ";7." + t("7yes");
    } else {
      return ";7." + t("7no");
    }
  }

  function terms() {
    const terms =
      "1." +
      t("1start") +
      props.state.amount +
      t("1end") +
      ";2." +
      t("2start") +
      props.state.ownerName +
      t("2middle") +
      "01" +
      t("2end") +
      sleepOver() +
      party() +
      ";5." +
      t("5") +
      ";6." +
      t("6") +
      smoking() +
      ";8." +
      t("8") +
      ";9." +
      t("9") +
      ";10." +
      t("10") +
      pets() +
      ";12." +
      t("12");
    return terms;
  }
  const startDate = moment(props.state.startDate).format("YYYY/M/D").toString();
  const endDate = moment(props.state.endDate).format("YYYY/M/D").toString();
  console.log("TYPE: "+props.state.type)
  console.log("CONTRACT: "+props.state.contractId)
  const onSubmit = (data: any) => {
    if (props.state.type == "new") {
      console.log("IM NEW")
      AddContract(
        props.state.houseId as string,
        startDate,
        endDate,
        terms(),
        props.state.amount as string,
        "house",
        props.state.ownerId as string,
        JSON.parse(localStorage.getItem("userData") as string).id
      ).then((res) => {
        console.log(
          "CONTRACT " + JSON.stringify(res.data["house contract"][1].contractId)
        );
        setLoading(false);
        AddTransaction(
          JSON.parse(localStorage.getItem("userData") as string).id,
          props.state.ownerId,
          res.data["house contract"][1].contractId.toString(),
          props.state.amount,
          props.state.paytype
        )
          .then((res) => {
            console.log(res);
            sucessPaymentFeedback();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            errorFeedback();
            setLoading(false);
          });
      });
    } else {
      console.log ("IM OLD")
      AddTransaction(
        JSON.parse(localStorage.getItem("userData") as string).id,
        props.state.ownerId,
        props.state.contractId,
        props.state.amount,
        props.state.paytype
      )
        .then((res) => {
          console.log(res);
          sucessPaymentFeedback();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          errorFeedback();
          setLoading(false);
        });
    }
  };
  const toBase64 = (file: any) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    let today = moment();
    setDate(today.format("LLLL"));
  }, []);

  function handleDrop(file: any) {
    const { name, path } = file[0];
    setFile(path);
    setFileName(name);
  }

  function dropText() {
    console.log("FILENAME" + fileName);
    if (fileName === "") {
      return (
        <p>
          {t("dragDrop")}
          <FiUpload className="inline ml-2" size={32} />
        </p>
      );
    } else {
      return <p>{fileName}</p>;
    }
  }

  const minE = 10000;
  const maxE = 99999;
  const randE = Math.floor(minE + Math.random() * (maxE - minE));

  const minR = 100000000;
  const maxR = 999999999;
  const randR = Math.floor(minR + Math.random() * (maxR - minR));

  const ref = React.createRef();

  console.log("TITLE " + props.state.title);

  function whatToShow(info: any) {
    if (info === "creditCard") {
      return (
        <div>
          <p className="label text-lg">
            {t("accept")}: <FaCcVisa className="inline ml-6" size={64} />{" "}
            <FaCcMastercard className="inline ml-6" size={64} />{" "}
            <FaCcDiscover className="inline ml-6" size={64} />{" "}
            <FaCcAmex className="inline ml-6" size={64} />
          </p>
          <hr className="contract bg-dark_blue" />
          <label className="label text-lg">{t("owner")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder={t("owner")}
            {...register("owner", {
              required: {
                value: true,
                message: t("pleaseFill") + t("owner"),
              },
            })}
            onChange={() => setOwner}
          />
          <p className="hidden">
            {errors.owner &&
              toast.dark(errors.owner.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">{t("cardNum")}:</label>
          <input
            className="inputBar"
            type="number"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            {...register("cardNum", {
              required: {
                value: true,
                message: t("pleaseFill") + t("cardNum"),
              },
            })}
            onChange={() => setCardNum}
          />
          <p className="hidden">
            {errors.cardNum &&
              toast.dark(errors.cardNum.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">{t("expDate")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder="MM/YY"
            {...register("expDate", {
              required: {
                value: true,
                message: t("pleaseFill") + t("expDate"),
              },
            })}
            onChange={() => setExpDate}
          />
          <p className="hidden">
            {errors.expDate &&
              toast.dark(errors.expDate.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">CVV:</label>
          <input
            className="inputBar"
            type="number"
            placeholder="CVV"
            {...register("cvv", {
              required: {
                value: true,
                message: t("pleaseFill") + "CVV",
              },
            })}
            onChange={() => setCvv}
          />
          <p className="hidden">
            {errors.cvv && toast.dark(errors.cvv.message, feebackBoxStyling)}
          </p>
          <hr className="contract bg-dark_blue" />
          <h1 className="label text-xl">{t("billing")}</h1>
          <label className="label text-lg">{t("address")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder={t("address")}
            {...register("address", {
              required: {
                value: true,
                message: t("pleaseFill") + t("address"),
              },
            })}
            onChange={() => setAddress}
          />
          <p className="hidden">
            {errors.address &&
              toast.dark(errors.address.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">{t("city")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder={t("city")}
            {...register("city", {
              required: {
                value: true,
                message: t("pleaseFill") + t("city"),
              },
            })}
            onChange={() => setCity}
          />
          <p className="hidden">
            {errors.city && toast.dark(errors.city.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">{t("zip")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder="xxxx-xxx"
            {...register("zip", {
              required: {
                value: true,
                message: t("pleaseFill") + t("zip"),
              },
            })}
            onChange={() => setZip}
          />
          <p className="hidden">
            {errors.zip && toast.dark(errors.zip.message, feebackBoxStyling)}
          </p>
        </div>
      );
    } else if (info === "paypal") {
      return (
        <div>
          <p className="label text-lg mx-5">{t("redirect")}:</p>
          <button className="redBtn font-bold" type="button">
            <FaPaypal className="inline" size={32} />
            PayPal
          </button>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="label text-xl">{t("billing")}</h1>
          <label className="label text-lg">{t("address")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder={t("address")}
            {...register("address", {
              required: {
                value: true,
                message: t("pleaseFill") + t("address"),
              },
            })}
            value={address}
            onChange={() => setAddress}
          />
          <p className="hidden">
            {errors.address &&
              toast.dark(errors.address.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">{t("city")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder={t("city")}
            {...register("city", {
              required: {
                value: true,
                message: t("pleaseFill") + t("city"),
              },
            })}
            onChange={() => setCity}
          />
          <p className="hidden">
            {errors.city && toast.dark(errors.city.message, feebackBoxStyling)}
          </p>
          <label className="label text-lg">{t("zip")}:</label>
          <input
            className="inputBar"
            type="text"
            placeholder="xxxx-xxx"
            {...register("zip", {
              required: {
                value: true,
                message: t("pleaseFill") + t("zip"),
              },
            })}
            onChange={() => setZip}
          />
          <p className="hidden">
            {errors.zip && toast.dark(errors.zip.message, feebackBoxStyling)}
          </p>
          <hr className="contract bg-dark_blue" />
          <h1 className="label text-xl">{t("payData")}</h1>
          <p className="label text-lg inline">{t("entity")}:</p>
          <p className="labelS text-dark_blue text-lg inline ml-2">{randE}</p>
          <br />
          <p className="label text-lg inline">{t("reference")}:</p>
          <p className="labelS text-dark_blue text-lg inline ml-2">{randR}</p>

          <p className="label text-lg ">{t("ifNot")}</p>
        </form>
      );
    }
  }
  console.log("RULES: " + props.state.rules);
  return (
    <div className="bg-main">
      <Navbar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="label text-3xl">{t("pleaseInsertPay")}</h1>
          <p className="label text-2xl inline">{t("amountToPay")}:</p>
          <p className="labelS text-2xl text-salmon ml-2 inline">
            {props.state.amount}€
          </p>
          <hr className="contract bg-dark_blue" />
          {whatToShow(props.state.paytype)}
          <hr className="contract bg-dark_blue" />
          <div className="contract grid grid-cols-2 gap-2">
            <div>
              <p className="labelS text-lg mx-5">{t("contractRules")}:</p>
              {localStorage.setItem("startDate", props.state.startDate)}
              {localStorage.setItem("endDate", props.state.endDate)}
              {localStorage.setItem("rent", props.state.amount)}
              {localStorage.setItem("address", props.state.address)}
              {localStorage.setItem("ownerName", props.state.ownerName)}
              {localStorage.setItem("email", props.state.ownerEmail)}
              {localStorage.setItem("phone", props.state.ownerPhone)}
              {localStorage.setItem("rules", props.state.rules)}
              <Link to="/contract" target="_blank">
                <button className="contBtn ml-4" type="button">
                  {t("contract")}
                </button>
              </Link>
            </div>
            <div>
              <Dropzone onDrop={handleDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({ className: "dropzone cursor-pointer" })}
                  >
                    <input {...getInputProps()} />
                    {dropText()}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
          {/* <div>
                    <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                        {({ toPdf }: any) => (
                            <button onClick={toPdf} className="finBtn" type="button" >Print</button>
                        )}
                    </ReactToPdf>
                </div> */}

          <Popup
            modal
            trigger={
              <button className="inline finBtn" id="hide" type="submit">
                {t("finish")}
              </button>
            }
            position="top center"
          >
            <ReceiptPopup
              rent={props.state.amount}
              card={watchFields[0]}
              title={props.state.title}
              name={props.state.ownerName}
              address={watchFields[1]}
              city={watchFields[2]}
              zip={watchFields[3]}
              reference={randR}
              entity={randE}
              t={props.state.paytype}
            />
          </Popup>
        </form>
      </div>
      <Footer />
      {/* <div ref={ref as React.LegacyRef<HTMLDivElement>}>{whatToShow2()}</div> */}
    </div>
  );
}
