import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./EditHousePopup.css";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { UpdateHouse, GetHouseById } from "../../_services/api";
import { toast } from "react-toastify";
import i18n from "../../i18nextConf";

type OptionType = {
    label: string;
    value: any;
};

export default function EditHousePopup(props: any) {
    const { t } = useTranslation();
    const [toUpdate, setToUpdate] = useState("")
    const [loading, setLoading] = useState(false);

    //FAZER UM GET HOUSE BY ID COM O props.houseId --------------------------------------------

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const watchHouseImages = watch(["houseImages"]);

    const feebackBoxStyling = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        draggable: true,
        toastId: "You have an error in your form.",
    };

    const House = [
        { label: t("apartment"), value: "apartment" },
        { label: t("house"), value: "house" },
    ];
    const Space = [
        { label: t("fullHouse"), value: "fullHouse" },
        { label: t("privateRoom"), value: "privateRoom" },
        { label: t("sharedRoom"), value: "sharedRoom" },
    ];
    const Commodities: OptionType[] = [
        { label: t("wifi"), value: "wifi" },
        { label: t("heater"), value: "heater" },
        { label: t("dishWasher"), value: "dishWasher" },
        { label: t("washingMachine"), value: "washingMachine" },
        { label: t("airConditioner"), value: "airConditioner" },
    ];
    const HouseRules: OptionType[] = [
        { label: t("onlyMen"), value: "onlyMen" },
        { label: t("onlyWomen"), value: "onlyWomen" },
        { label: t("smoking"), value: "smoking" },
        { label: t("pets"), value: "pets" },
        { label: t("sleepovers"), value: "sleepovers" },
    ];
    const Installations: OptionType[] = [
        { label: t("parking"), value: "parking" },
        { label: t("pool"), value: "pool" },
        { label: t("gym"), value: "gym" },
    ];

    let images: string[] = [];

    for (let i = 0; i < watchHouseImages[0]?.length; i++) {
        images.push(URL.createObjectURL(watchHouseImages[0][i]));
    }
    let previewImages = watchHouseImages[0] ? images : undefined;

    function handleChange(event: any) {
        const { value } = event.target
        setToUpdate(value)
    }

    function refreshData(){
        setLoading(true);
        GetHouseById(props.houseId)
            .then((res: any ) => {
                localStorage.setItem("houseData", JSON.stringify(res.data.house))
                props.updateData(res.data.house)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }

    const possibleFeedbacks = {
        updateSuccessful: i18n.t("updateSuccessful"),
        errorFeedback: i18n.t("errorFeedback"),
      };
    const sucessfullLoginFeedback = () => toast.dark(possibleFeedbacks.updateSuccessful, feebackBoxStyling);
    const errorFeedback = () => toast.dark(possibleFeedbacks.errorFeedback, feebackBoxStyling);

    function submit(name:any) {
        let index;
        let attr = []
        let houseAttr = [
           "address",
           "location",
           "coordinates",
           "rent",
           "maxPeopleNum",
           "roomsNum",
           "area",
           "houseType",
           "spaceType",
           "description",
           "houseRules",
           "dateAvailable"
        ]
        for (var i =0; i < houseAttr.length; i++) {
            if (houseAttr[i] === name) {
                attr.push((document.getElementById(name) as HTMLInputElement).value)
            } else {
                attr.push(undefined)
            }
        }

        UpdateHouse(props.houseId, ...attr)
            .then((res: any) => {
                // refreshData()
                sucessfullLoginFeedback()
                setLoading(false);
            })
            .catch(err => {
                errorFeedback()
                setLoading(false);
                console.log(err)
            })
    }

    return (
        <div className="bg-white rounded-lg modalHouse centerHouse">
            <h1 className="text-3xl text-center font-bold">
                Edit your offer:
            </h1>
            <div className="max-h-80 overflow-auto m-4">
                    {/* ADDRESS */}
                    <label className="font-bold text-lg border-white">
                        {t("address")}:
                    </label>
                    <br />
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="text"
                        id="address"
                        placeholder={t("address")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("address")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* LOCATION */}
                    <label className="font-bold text-lg border-white">
                        {t("location")}:
                    </label>
                    <br />
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="text"
                        id="location"
                        placeholder={t("location")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("location")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* COORDINATES */}
                    <label className="font-bold text-lg border-white">
                        {t("coordinates")}:
                    </label>
                    <br />
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="text"
                        id="coordinates"
                        placeholder={t("coordinates")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("coordinates")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* RENT */}
                    <label className="font-bold text-lg border-white">
                        {t("maxRent")}:
                    </label>
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="number"
                        id="rent"
                        placeholder={t("rent")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("rent")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* MAX PEOPLE */}
                    <label className="font-bold text-lg border-white">
                        {t("maxPeople")}:
                    </label>
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="number"
                        id="maxPeopleNum"
                        placeholder={t("numberOfPeople")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("maxPeopleNum")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* ROOMS NUM */}
                    <label className="font-bold text-lg border-white">
                        {t("roomsNum")}:
                    </label>
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="number"
                        id="roomsNum"
                        placeholder={t("numberOfRooms")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("roomsNum")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* AREA */}
                    <label className="font-bold text-lg border-white">
                        {t("area")}:
                    </label>
                    <br />
                    <input
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        type="number"
                        id="area"
                        placeholder={t("area")}
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("area")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* HOUSE TYPE */}
                    <label className="font-bold text-lg border-white">
                        {t("houseType")}:
                    </label>
                    <Controller
                        name="houseType"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t("pleaseFill") + t("houseType")
                            },
                        }}
                        render={({
                            field: { onChange, value, ref },
                        }) => (
                            <Select
                                inputRef={ref}
                                className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                options={House}
                                placeholder={t("select")}
                                onChange={(val) => onChange(val)}
                            />
                        )}
                    />
                    <p className="hidden">
                        {errors.houseType &&
                            toast.dark(
                                errors.houseType.message,
                                feebackBoxStyling
                            )}
                    </p>
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("houseType")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* SPACE TYPE */}
                    <label className="font-bold text-lg border-white">
                        {t("spaceType")}:
                    </label>
                    <Controller
                        name="spaceType"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t("pleaseFill") + t("spaceType"),
                            },
                        }}
                        render={({
                            field: { onChange, value, ref },
                        }) => (
                            <Select
                                inputRef={ref}
                                className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                options={Space}
                                placeholder={t("select")}
                                onChange={(val) => onChange(val)}
                            />
                        )}
                    />
                    <p className="hidden">
                        {errors.spaceType &&
                            toast.dark(
                                errors.spaceType.message,
                                feebackBoxStyling
                            )}
                    </p>
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("spaceType")
                        }}
                    >
                        {t("update")}
                    </button>
                    
                    {/* DESCRIPTION  */}

                    <label className="font-bold text-lg border-white">
                        {t("description")}:
                    </label>
                    <textarea
                        className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                        id= "description"
                    />
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("description")
                        }}
                    >
                        {t("update")}
                    </button> 

                    {/* HOUSE RULES */}

                    <label className="font-bold text-lg border-white">
                        {t("houseRules")}:
                    </label>
                    <Controller
                        name="houseRules"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t("pleaseFill") + t("houseRules"),
                            },
                        }}
                        render={({
                            field: { onChange, value, ref },
                        }) => (
                            <Select
                                inputRef={ref}
                                className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                options={HouseRules}
                                isMulti
                                placeholder={t("select")}
                                onChange={(val) => onChange(val)}
                            />
                        )}
                    />
                    <p className="hidden">
                        {errors.houseRules &&
                            toast.dark(
                                errors.houseRules.message,
                                feebackBoxStyling
                            )}
                    </p>
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("houseRules")
                        }}
                    >
                        {t("update")}
                    </button>

                    {/* DATE AVAILABLE */}

                    <label className="font-bold text-lg border-white">
                        {t("dateAvailability")}:
                    </label>
                    <Controller
                        name={"dateAvailable"}
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t("pleaseFill") + t("dateAvailability"),
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                className="w-full md:w-full border-none rounded-xl shadow-marta bg-white px-3 py-2 my-4"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <p className="hidden">
                        {errors.dateAvailable &&
                            toast.dark(
                                errors.dateAvailable.message,
                                feebackBoxStyling
                            )}
                    </p>
                    <button
                        className="updateBtn items-center font-semibold inline-block"
                        type="submit"
                        onClick={() => {
                            submit("dateAvailable")
                        }}
                    >
                        {t("update")}
                    </button>
                    
            </div>
        </div>
    )
}

function typeOf(arg0: HTMLElement | null): any {
    throw new Error("Function not implemented.");
}
