import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./EditPopup.css";
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { BiBadgeCheck } from "react-icons/bi";
import { IconType } from "react-icons";
import { GetProfile, UpdateUser } from "../../_services/api";
import CircleLoader from "react-spinners/CircleLoader";

export default function EditPopup(props: any) {
    const { t } = useTranslation();
    const [toUpdate, setToUpdate] = useState("");
    const [oldPwd, setOldPwd] = useState("");
    const [icon, setIcon] = useState("");
    const [show, setShow] = useState("input");
    const [loading, setLoading] = useState(false);

    function updateName(){
        UpdateUser("fullname")
    }

    function refreshData(){
        setLoading(true);
        GetProfile()
            .then((res: any ) => {
                localStorage.setItem("userData", JSON.stringify(res.data.user))
                props.updateData(res.data.user)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }

    function update() {
        setLoading(true);
        console.log("Updating: " + props.value)
        if (props.value == "fullName") {
            UpdateUser(undefined, toUpdate)
            .then((res: any) => {
                refreshData()
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
            //update bd name do user com id props.id with toUpdate
        }
        if (props.value == "birthday") {
            UpdateUser(undefined, undefined, toUpdate)
            .then((res: any) => {
                refreshData()
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
            //update bd birthday do user com id props.id with toUpdate
        }
        if (props.value == "phoneNum") {
            UpdateUser(undefined, undefined, undefined, undefined, undefined, toUpdate)
            .then((res: any) => {
                refreshData()
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
            //update bd phone do user com id props.id with toUpdate
        }
        if (props.value == "address") {
            UpdateUser(undefined, undefined, undefined, toUpdate)
            .then((res: any) => {
                refreshData()
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
            //update bd phone do user com id props.id with toUpdate
        }
        if (props.value == "cardNum") {
            UpdateUser(undefined, undefined, undefined, undefined, toUpdate)
            .then((res: any) => {
                refreshData()
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
            //update bd card do user com id props.id with toUpdate
        }
        if (props.value == "password") {
            //update bd password do user com id props.id with toUpdate
        }

        setShow("success")
    }

    function handleChange(event: any) {
        const { value } = event.target
        console.log("Changing: " + value)
        setToUpdate(value)
    }

    function checkOldPassword(event: any) {
        const { value } = event.target
        const trueValue = "Sky" //ir buscar password antiga à bd ---------------------------
        if (value === trueValue) {
            setIcon("FcCheckmark")
            setOldPwd(value)
        } else {
            setIcon("ImCross")
            setOldPwd(value)
        }
    }

    function simbol() {
        if (icon === "FcCheckmark") {
            return (
                <FcCheckmark className="inline ml-4 mb-1 font-bold text-3xl" />
            )
        } else {
            return (
                <ImCross color="#ea4335" className="inline ml-4 mb-1" />
            )
        }

    }

    function handlePop() {
        if (props.value == "password") {
            return (
                <div>
                    <input
                        className="inputBar "
                        type="text"
                        name="password"
                        placeholder={t("old") + " " + t(props.value)}
                        value={oldPwd}
                        onChange={checkOldPassword}
                    />
                    {simbol()}
                    <input
                        className="inputBar"
                        type="text"
                        name="toUpdate"
                        placeholder={t("new") + " " + t(props.value)}
                        value={toUpdate}
                        onChange={handleChange}
                    />
                </div>
            )
        } else {
            return (
                <input
                    className="inputBar"
                    type="text"
                    name="toUpdate"
                    placeholder={t("new") + " " + t(props.value)}
                    value={toUpdate}
                    onChange={handleChange}
                />
            )

        }
    }

    function whatToShow() {
        if (show == "input") {
            return (
                <div className="py-12 px-6">
                    <h3 className="font-bold text-dark_blue text-xl ml-8">{t(props.value)}:</h3>
                    {handlePop()}
                    <br />
                    <button onClick={update} className="contBtn float-right mt-4 mb-2" type="submit" >{t("update")}</button>
                </div>
            )
        }else{
            return(
                <div className="py-12 px-6">
                    <h1 className="label text-3xl">{t("Update Sucessfull")}</h1>
                    <BiBadgeCheck size={64} color={"#43A047"} className="inline mx-32" />
                </div>
            )
        }
    }

    return (
        <div className="bg-white rounded-lg modalEdit center">
            <div style={{position: 'absolute', left: '30%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                <CircleLoader color='#cccccc' loading={loading} size={150} />
            </div>
            {whatToShow()}
        </div>
        
    )
}