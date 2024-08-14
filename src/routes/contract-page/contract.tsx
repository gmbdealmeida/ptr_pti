import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./contract.css";
import { GetContractById } from "../../_services/api";

export default function Contract(props: any) {
  const { t } = useTranslation();

  const [contracts, setContract] = useState([]);

  useEffect(() => {
    GetContractById(props.id).then((res) => {
      console.log(res.data.contract);
      console.log("RES.DATA--->", res.data);
    });
  }, []);

  GetContractById("1");
  const ownerName = localStorage.getItem("ownerName");
  const ownerEmail = localStorage.getItem("email");
  const ownerPhone = localStorage.getItem("phone");
  const ownerPayDay = "01";
  const houseRent = localStorage.getItem("rent");
  const houseAddress = localStorage.getItem("address");
  const renterName = JSON.parse(
    localStorage.getItem("userData") as string
  ).name;
  const renterEmail = JSON.parse(
    localStorage.getItem("userData") as string
  ).email;
  const renterPhone = JSON.parse(
    localStorage.getItem("userData") as string
  ).cellphoneNumber;

  let sleepover = false;
  let parties = false;
  let pet = false;
  let smoke = false;
  const rules = (localStorage.getItem("rules") as string).split(" ");
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

  function sleepOver() {
    if (sleepover) {
      return <p>3. {t("3yes")}</p>;
    } else {
      return <p>3. {t("3no")}</p>;
    }
  }

  function party() {
    if (parties) {
      return <p>4. {t("4yes")}</p>;
    } else {
      return <p>4. {t("4no")}</p>;
    }
  }

  function pets() {
    if (pet) {
      return <p>11. {t("11yes")}</p>;
    } else {
      return <p>11. {t("11no")}</p>;
    }
  }

  function smoking() {
    if (smoke) {
      return <p>7. {t("7yes")}</p>;
    } else {
      return <p>7. {t("7no")}</p>;
    }
  }

  return (
    <div>
      <div className="margins">
        <h1 className="labelC text-3xl">{t("rentalAgreement")}</h1>
        <hr />
        <div>
          <h3 className="labelC text-2xl">{t("landlordInformation")}</h3>
          <p className="labelC text-lg">{t("name")}</p>: <p>{ownerName}</p>
          <br />
          <p className="labelC text-lg">{t("email")}</p>: <p>{ownerEmail}</p>
          <br />
          <p className="labelC text-lg">{t("phoneNumber")}</p>:{" "}
          <p>{ownerPhone}</p>
          <br />
          <p className="labelC text-lg">{t("addressRental")}</p>:{" "}
          <p>{houseAddress}</p>
        </div>
        <br />
        <hr />
        <div>
          <h3 className="labelC text-2xl">{t("renterInformation")}</h3>
          <p className="labelC text-lg">{t("name")}</p>: <p>{renterName}</p>
          <br />
          <p className="labelC text-lg">{t("email")}</p>: <p>{renterEmail}</p>
          <br />
          <p className="labelC text-lg">{t("phoneNumber")}</p>:{" "}
          <p>{renterPhone}</p>
        </div>
        <br />
        <hr />
        <div>
          <h3 className="labelC text-2xl">{t("contract")}</h3>
          <p className="labelC text-lg">{t("duration")}</p>
          <br />
          <p className="inline font-bold text-dark_blue">{t("from")}: </p>
          <p className="inline">{localStorage.getItem("startDate")}</p>
          <br />
          <p className="inline font-bold text-dark_blue">{t("to")}: </p>
          <p className="inline">{localStorage.getItem("endDate")}</p>
          <br />
          <br />
          <p>{t("agreementEffect")}</p>
          <br />
          <p className="labelC text-lg">{t("agreement")}</p>
          <br />
          <p>
            1. {t("1start")} {houseRent} {t("1end")}
          </p>
          <br />
          <p>
            2. {t("2start")} {ownerName} {t("2middle")} {ownerPayDay}{" "}
            {t("2end")}
          </p>
          <br />
          {sleepOver()}
          <br />
          {party()}
          <br />
          <p>5. {t("5")}</p>
          <br />
          <p>6. {t("6")}</p>
          <br />
          {smoking()}
          <br />
          <p>8. {t("8")}</p>
          <br />
          <p>9. {t("9")}</p>
          <br />
          <p>10. {t("10")}</p>
          <br />
          {pets()}
          <br />
          <p>12. {t("12")}</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="labelC text-lg">
              {t("dateSignature")} __________________________
            </p>
          </div>
          <div>
            <p className="labelC text-lg">{t("renterSignature")}</p>
            <br />
            <br />
            <br />
            <p className="labelC text-lg">
              _____________________________________
            </p>
          </div>
          <br />
        </div>
      </div>
      <button
        onClick={() => window.print()}
        id="hide"
        className="finBtn"
        type="button"
      >
        {t("printContract")}
      </button>
    </div>
  );
}
