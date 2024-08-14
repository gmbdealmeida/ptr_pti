import React, { Component, useEffect, useState } from "react";
import "./Filter.css";

import { useTranslation } from "react-i18next";
import Select from "react-select";
import "react-dates/initialize";
import { SingleDatePicker, FocusedInputShape } from "react-dates";
import moment, { Moment } from "moment";
import { Controller, useForm } from "react-hook-form";
const queryString = require("query-string");

type OptionType = {
    label: string;
    value: any;
};

interface IFilterState {
    location: string;
    rent: number;
    maxPeopleNum: number;
    roomsNum: number;
    apartment: boolean;
    house: boolean;
    fullHouse: boolean;
    privateRoom: boolean;
    sharedRoom: boolean;
    wifi: boolean;
    heater: boolean;
    dishWasher: boolean;
    washingMachine: boolean;
    airConditioner: boolean;
    onlyMen: boolean;
    onlyWomen: boolean;
    smoking: boolean;
    pets: boolean;
    sleepovers: boolean;
    parking: boolean;
    pool: boolean;
    gym: boolean;
    rating: number;
    maxHourDay: number;
    minHourDay: number;
    priceHour: number;
    cleaner: boolean;
    plumber: boolean;
    electrician: boolean;
    ironing: boolean;
    windowCleaner: boolean;
    tecnic: boolean;
    cook: boolean;
    painter: boolean;
    gardener: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}

function Filter() {
    const { t } = useTranslation();
    const House = [
        { label: t("apartment"), value: "apartment" },
        { label: t("house"), value: "house" },
    ];
    const Service = [
        { label: t("cleaner"), value: "cleaner" },
        { label: t("plumber"), value: "plumber" },
        { label: t("electrician"), value: "electrician" },
        { label: t("ironing"), value: "ironing" },
        { label: t("windowCleaner"), value: "windowCleaner" },
        { label: t("tecnic"), value: "tecnic" },
        { label: t("cook"), value: "cook" },
        { label: t("painter"), value: "painter" },
        { label: t("gardener"), value: "gardener" },
    ];
    const DaysOff: OptionType[] = [
        { label: t("monday"), value: "monday" },
        { label: t("tuesday"), value: "tuesday" },
        { label: t("wednesday"), value: "wednesday" },
        { label: t("thursday"), value: "thursday" },
        { label: t("friday"), value: "friday" },
        { label: t("saturday"), value: "saturday" },
        { label: t("sunday"), value: "sunday" },
        { label: t("none"), value: "none" },
    ];
    const Space: OptionType[] = [
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
        { label: t("parties"), value: "parties" },
    ];

    const Installations: OptionType[] = [
        { label: t("parking"), value: "parking" },
        { label: t("pool"), value: "pool" },
        { label: t("gym"), value: "gym" },
    ];

    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [focusedInput, setFocusedInput] =
        useState<boolean>(false);
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setValue,
    } = useForm();
    const [qsState, setQsState] = useState<any>(
        queryString.parse(window.location.search)
    );

    let session = localStorage.getItem("accountType");

    useEffect(() => {
        setValue("location", qsState.location);
        setValue("rent", qsState.rent);
        setValue("maxPeopleNum", qsState.maxPeopleNum);
        setValue("roomsNum", qsState.roomsNum);
        setValue("rating", qsState.rating);
        setStartDate(
            qsState.startDate?.length > 0 ? moment(qsState.startDate) : null
        );
    }, []);

    function getSelectState(param: string) {
        let tempDict = [];
        if (typeof qsState[param] !== "string") {
            for (let i = 0; i < qsState[param]?.length; i++) {
                tempDict.push({
                    label: t(qsState[param][i]),
                    value: qsState[param][i],
                });
            }
        } else if (qsState[param].length > 0) {
            tempDict.push({ label: t(qsState[param]), value: qsState[param] });
        }
        return tempDict;
    }

    function whatToShow() {
        if (session === "Host") {
            return (
                <div>
                    <label className="label">{t("location")}:</label>
                    <input
                        className="inputBarF"
                        type="text"
                        placeholder={t("location")}
                        {...register("location")}
                    />
                    <label className="label">{t("maxHourDay")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        name="maxHourDay"
                        placeholder={t("maxHourDay")}
                    />
                    <label className="label">{t("minHourDay")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        name="minHourDay"
                        placeholder={t("minHourDay")}
                    />
                    <label className="label">{t("priceHour")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        name="priceHour"
                        placeholder={t("priceHour")}
                    />
                    <label className="label">{t("serviceType")}:</label>
                    <Select
                        className="select-styleF shadow-none z-50"
                        isMulti
                        options={Service}
                        id="ServiceType"
                    />
                    <label className="label">{t("daysOff")}:</label>
                    <Select
                        name="DaysOff"
                        className="select-styleF shadow-none"
                        options={DaysOff}
                        isMulti={true}
                    />
                    <label className="label">{t("rating")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        name="rating"
                        placeholder={t("rating")}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <label className="label">{t("location")}:</label>
                    <input
                        className="inputBarF"
                        type="text"
                        placeholder={t("location")}
                        {...register("location")}
                    />
                    <label className="label">{t("maxRent")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        placeholder={t("rent")}
                        {...register("rent")}
                    />
                    <label className="label">{t("maxPeople")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        placeholder={t("numberOfPeople")}
                        {...register("maxPeopleNum")}
                    />
                    <label className="label">{t("maxRooms")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        placeholder={t("numberOfRooms")}
                        {...register("roomsNum")}
                    />
                    <label className="label">{t("houseType")}:</label>
                    <Controller
                        name="houseType"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                inputRef={ref}
                                name="HouseType"
                                onChange={(val) => onChange(val?.value)}
                                defaultValue={getSelectState("HouseType")}
                                className="select-styleF shadow-none z-50"
                                options={House}
                            />
                        )}
                    />
                    <label className="label">{t("spaceType")}:</label>
                    <Controller
                        name="spaceType"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                inputRef={ref}
                                name="SpaceType"
                                onChange={(val) => onChange(val?.value)}
                                defaultValue={getSelectState("SpaceType")}
                                className="select-styleF shadow-none"
                                options={Space}
                            />
                        )}
                    />
                    <label className="label">{t("commodities")}:</label>
                    <Controller
                        name="commodities"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                inputRef={ref}
                                name="Commodities"
                                onChange={(val) => {
                                    console.log(val);
                                    onChange(val);
                                }}
                                defaultValue={getSelectState("Commodities")}
                                className="select-styleF shadow-none"
                                options={Commodities}
                                isMulti={true}
                            />
                        )}
                    />
                    <label className="label">{t("houseRules")}:</label>
                    <Controller
                        name="houseRules"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                inputRef={ref}
                                name="HouseRules"
                                onChange={(val) => onChange(val)}
                                defaultValue={getSelectState("HouseRules")}
                                className="select-styleF shadow-none"
                                options={HouseRules}
                                isMulti
                            />
                        )}
                    />
                    <label className="label">{t("installations")}:</label>
                    <Controller
                        name="installations"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                inputRef={ref}
                                name="Installations"
                                onChange={(val) => onChange(val)}
                                defaultValue={getSelectState("Installations")}
                                className="select-styleF shadow-none"
                                options={Installations}
                                isMulti
                            />
                        )}
                    />
                    <label className="label">{t("rating")}:</label>
                    <input
                        className="inputBarF"
                        type="number"
                        min="0"
                        max="5"
                        placeholder={t("rating")}
                        {...register("rating", {
                            min: 0,
                            max: 5,
                        })} //0-5
                    />
                </div>
            );
        }
    }

    return (
        <div>
            <form className="filterForm flex flex-col justify-start text-left">
                <label className="label">{t("choose-dates")}</label>
                <div className="max-w-md">
                    <Controller
                        name={"dateAvailable"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <SingleDatePicker
                                date={startDate} // momentPropTypes.momentObj or null
                                onDateChange={date => setStartDate(date)} // PropTypes.func.isRequired
                                focused={focusedInput} // PropTypes.bool
                                onFocusChange={({ focused }) => setFocusedInput(focused)} // PropTypes.func.isRequired
                                id="dateAvailable" // PropTypes.string.isRequired,
                            />
                        )}
                    />
                </div>
                {whatToShow()}
                <button
                    className="filterBtn items-center font-semibold"
                    type="submit"
                >
                    {t("filter")}
                </button>
            </form>
        </div>
    );
}

export default Filter;
