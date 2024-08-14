import React, { useState } from "react";
import "./createHouse.css";
import { useTranslation } from "react-i18next";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import Select from "react-select";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Controller, useForm } from "react-hook-form";
import { AddHouse } from "../../_services/api";
import { toast } from "react-toastify";
import i18n from "../../i18nextConf";
import CircleLoader from "react-spinners/CircleLoader";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input, List } from "antd";

type OptionType = {
    label: string;
    value: any;
};

export default function CreateHouse() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        useGoogle({
            apiKey: process.env.REACT_APP_GOOGLE,
        });
    const [isListVisible, setIsListVisible] = useState(false);
    const [addressObject, setAddressObject] = useState<any>();

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

    let titleClass = "font-bold text-lg ";
    let addressClass = "font-bold text-lg ";
    let locationClass = "font-bold text-lg ";
    let coordinatesClass = "font-bold text-lg ";
    let rentClass = "font-bold text-lg ";
    let maxPeopleClass = "font-bold text-lg ";
    let roomsNumClass = "font-bold text-lg ";
    let areaClass = "font-bold text-lg ";
    let houseTypeClass = "font-bold text-lg ";
    let spaceTypeClass = "font-bold text-lg ";
    let commoditiesClass = "font-bold text-lg ";
    let installationsClass = "font-bold text-lg ";
    let descriptionClass = "font-bold text-lg ";
    let closeServicesClass = "font-bold text-lg ";
    let houseRulesClass = "font-bold text-lg ";
    let dateAvailableClass = "font-bold text-lg ";
    let picturesClass = "font-bold text-lg ";

    if (errors.title) {
        titleClass += "border-red-800";
    } else {
        titleClass += "border-white";
    }

    if (errors.address) {
        addressClass += "text-maroon";
    } else {
        addressClass += "text-dark_blue";
    }

    if (errors.location) {
        locationClass += "text-maroon";
    } else {
        locationClass += "text-dark_blue";
    }

    if (errors.coordinates) {
        coordinatesClass += "text-maroon";
    } else {
        coordinatesClass += "text-dark_blue";
    }

    if (errors.rent) {
        rentClass += "text-maroon";
    } else {
        rentClass += "text-dark_blue";
    }

    if (errors.maxPeopleNum) {
        maxPeopleClass += "text-maroon";
    } else {
        maxPeopleClass += "text-dark_blue";
    }

    if (errors.roomsNum) {
        roomsNumClass += "text-maroon";
    } else {
        roomsNumClass += "text-dark_blue";
    }

    if (errors.area) {
        areaClass += "text-maroon";
    } else {
        areaClass += "text-dark_blue";
    }

    if (errors.houseType) {
        houseTypeClass += "text-maroon";
    } else {
        houseTypeClass += "text-dark_blue";
    }

    if (errors.spaceType) {
        spaceTypeClass += "text-maroon";
    } else {
        spaceTypeClass += "text-dark_blue";
    }

    if (errors.commodities) {
        commoditiesClass += "text-maroon";
    } else {
        commoditiesClass += "text-dark_blue";
    }

    if (errors.installations) {
        installationsClass += "text-maroon";
    } else {
        installationsClass += "text-dark_blue";
    }

    if (errors.description) {
        descriptionClass += "text-maroon";
    } else {
        descriptionClass += "text-dark_blue";
    }

    if (errors.closeServices) {
        closeServicesClass += "text-maroon";
    } else {
        closeServicesClass += "text-dark_blue";
    }

    if (errors.houseRules) {
        houseRulesClass += "text-maroon";
    } else {
        houseRulesClass += "text-dark_blue";
    }

    if (errors.dateAvailable) {
        dateAvailableClass += "text-maroon";
    } else {
        dateAvailableClass += "text-dark_blue";
    }

    if (errors.houseImages) {
        picturesClass += "text-maroon";
    } else {
        picturesClass += "text-dark_blue";
    }
    
//------------------------------------------
const possibleFeedbacks = {
    sucessfullHouseAddedFeedback: i18n.t("sucessfullHouseAddedFeedback"),
    errorFeedback: i18n.t("errorFeedback"),
  };

  const feebackBoxStyling2 = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    draggable: true,
  }

  const sucessfullHouseAddedFeedback = () => toast.dark(possibleFeedbacks.sucessfullHouseAddedFeedback, feebackBoxStyling2);
  const errorFeedback = () => toast.dark(possibleFeedbacks.errorFeedback, feebackBoxStyling2);
  const errorAddressSubmit = () => toast.dark(t("errorAddressSubmit"), feebackBoxStyling);
  const errorAddressSubmit2 = () => toast.dark(t("errorAddressSubmit2"), feebackBoxStyling);
//------------------------------------------
    
    const onSubmit = (data: any) => {
        if(isListVisible) {
            errorAddressSubmit()
        } else { 
                const bounds = new window.google.maps.Geocoder().geocode({placeId: addressObject.place_id}, (res: any) => {
                    
                    let coords:{lat: number, lng: number} = {
                        lat: 38.736946,
                        lng: -9.142685
                    }
                    coords.lat = res[0]?.geometry.location.lat()
                    coords.lng = res[0]?.geometry.location.lng()
                    for (let i = 0; i < res[0]?.address_components.length; i++) {
                        if(res[0].address_components[i].types[0]==="administrative_area_level_1") {
                            data.location = res[0].address_components[i].long_name
                        }
                    }
                    data.coordinates = JSON.stringify(coords)
                    setLoading(true);
                    createHouse(data)
                        .then((res) => {
                            console.log(res);
                            sucessfullHouseAddedFeedback();
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.log(err);
                            errorFeedback();
                            setLoading(false);
                        });
                });
            
        }
    };


    function createHouse(data: any) {
        // parse data before promise
        let promise = new Promise((resolve, reject) => {
            toBase64Array(data.houseImages)
                .then(pictures => {
                    let houseType = data.houseType.value
                    let spaceType = data.spaceType.value
                    let commodities = ""
                    data.commodities.forEach((element: any) => {
                        commodities += element.value + " "
                    });
                    let installations = ""
                    data.installations.forEach((element: any) => {
                        installations += element.value + " "
                    });
                    let houseRules = ""
                    data.houseRules.forEach((element: any) => {
                        houseRules += element.value + " "
                    });
                    let dateAvailable = new Date(data.dateAvailable).toLocaleDateString('ko-KR').replace(/. /g, "/").replace(".", "").trim().replace("\n", "").toString()
                    AddHouse(
                        //ADICIONAR CLOSE SERVICES AO ADDHOUSE
                        data.title,
                        data.address,
                        data.location,
                        data.coordinates,
                        data.rent,
                        data.maxPeopleNum,
                        data.roomsNum,
                        data.area,
                        houseType,
                        spaceType,
                        commodities,
                        installations,
                        data.description,
                        houseRules,
                        dateAvailable,
                        pictures
                    )
                        .then(res => {
                            window.location.href = "/profile"
                        })
                        .catch(err => {
                            window.location.href = "/profile"
                        })
                })
                .catch(err => console.log(err))
        });
        return promise;
    }
    const toBase64Array = (fileArray: any) => 
        new Promise<string>(async (resolve, reject) => {
            console.log(fileArray)
            let base64Files = ''
            for (let i = 0; i < fileArray.length; i++) {
                let fileString = await toBase64(fileArray[i])
                base64Files += fileString + " "
            }
            resolve(base64Files)
        })
    
    const toBase64 = (file: any) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

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

    return (
        <div className="bg-main">
            <Navbar />
            <div className="flex flex-col mx-20 md:mx-36 lg:mx-48">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-grow mt-8 mb-16">
                        <h1 className="text-3xl text-center font-bold">
                            {t("pleaseInsert")}
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={titleClass}>
                                {t("title")}:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                type="text"
                                placeholder={t("title")}
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("title")
                                    }
                                })}
                            />
                            <p className="hidden">
                                {errors.title &&
                                    toast.dark(
                                        errors.title.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            <br />
                            
                        </div>
                        <div className="flex-1 mx-12">
                        <label className={addressClass}>
                                {t("address")}:
                            </label>
                            <br />
                            <Controller
                                    name={"address"}
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Please fill your Address",
                                        },
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <div className="w-full md:w-full my-4">
                                            <Input.Search
                                                className="mb-3 focus:ring-0"
                                                enterButton={false}
                                                placeholder={t("addressInput")}
                                                value={value}
                                                onChange={(e: any) => {
                                                    onChange(e.target.value);
                                                    getPlacePredictions({
                                                        input: e.target.value,
                                                        types: ["geocode"],
                                                        componentRestrictions: {
                                                            country: "pt",
                                                        },
                                                    });
                                                    setIsListVisible(true)
                                                }}
                                                loading={
                                                    isPlacePredictionsLoading
                                                }
                                            />
                                            {isListVisible && (
                                                <List
                                                    dataSource={placePredictions}
                                                    renderItem={(item: any) => (
                                                        <List.Item
                                                            onClick={() => {
                                                                console.log(item)
                                                                onChange(item.description)
                                                                setAddressObject(item)
                                                                setIsListVisible(false)
                                                            }
                                                            }
                                                        >
                                                            <List.Item.Meta
                                                                title={
                                                                    item.description
                                                                }
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            )}
                                        </div>
                                    )}
                                />
                            <p className="hidden">
                                {errors.address &&
                                    toast.dark(
                                        errors.address.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 flex flex-col md:flex-row">
                            <div className="flex-1 mx-12">
                                <label className={rentClass}>
                                    {t("maxRent")}:
                                </label>
                                <input
                                    className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("rent")}
                                    {...register("rent", {
                                        required: {
                                            value: true,
                                            message: t("pleaseFill") + t("rent")
                                        }
                                    })}
                                />
                                <p className="hidden">
                                {errors.rent &&
                                    toast.dark(
                                        errors.rent.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            </div>
                            <div className="flex-1 mx-12">
                                <label className={maxPeopleClass}>
                                    {t("maxPeople")}:
                                </label>
                                <input
                                    className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("numberOfPeople")}
                                    {...register("maxPeopleNum", {
                                        required: {
                                            value: true,
                                            message: t("pleaseFill") + t("numberOfPeople")
                                        }
                                    })}
                                />
                                <p className="hidden">
                                {errors.maxPeopleNum &&
                                    toast.dark(
                                        errors.maxPeopleNum.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row">
                            <div className="flex-1 mx-12">
                                <label className={roomsNumClass}>
                                    {t("maxRooms")}:
                                </label>
                                <input
                                    className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("numberOfRooms")}
                                    {...register("roomsNum", {
                                        required: {
                                            value: true,
                                            message: t("pleaseFill") + t("numberOfRooms")
                                        }
                                    })}
                                />
                                <p className="hidden">
                                {errors.roomsNum &&
                                    toast.dark(
                                        errors.roomsNum.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            </div>
                            <div className="flex-1 mx-12">
                                <label className={areaClass}>
                                    {t("area")}:
                                </label>
                                <br />
                                <input
                                    className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("area")}
                                    {...register("area", {
                                        required: {
                                            value: true,
                                            message: t("pleaseFill") + t("area")
                                        }
                                    })}
                                />
                                <p className="hidden">
                                {errors.area &&
                                    toast.dark(
                                        errors.area.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={houseTypeClass}>
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
                            <label className={spaceTypeClass}>
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
                        </div>
                        <div className="flex-1 mx-12">
                            <label className={commoditiesClass}>
                                {t("commodities")}:
                            </label>
                            <Controller
                                name="commodities"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("commodities"),
                                    },
                                }}
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        inputRef={ref}
                                        className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                        options={Commodities}
                                        isMulti
                                        placeholder={t("select")}
                                        onChange={(val) => onChange(val)}
                                    />
                                )}
                            />
                            <p className="hidden">
                                {errors.commodities &&
                                    toast.dark(
                                        errors.commodities.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            <label className={installationsClass}>
                                {t("installations")}:
                            </label>
                            <Controller
                                name="installations"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("installations"),
                                    },
                                }}
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        inputRef={ref}
                                        className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                        options={Installations}
                                        isMulti
                                        placeholder={t("select")}
                                        onChange={(val) => onChange(val)}
                                    />
                                )}
                            />
                            <p className="hidden">
                                {errors.installations &&
                                    toast.dark(
                                        errors.installations.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={houseRulesClass}>
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
                        </div>
                        <div className="flex-1 mx-12">
                            <label className={dateAvailableClass}>
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
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={descriptionClass}>
                                {t("description")}:
                            </label>
                            <textarea
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("description")
                                    },
                                    maxLength: {
                                        value: 3000,
                                        message: "Não pode passar das 3000 characters"
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.description &&
                                    toast.dark(
                                        errors.description.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={closeServicesClass}>
                                {t("closeServices")}:
                            </label>
                            <textarea
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                {...register("closeServices", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("closeServices")
                                    },
                                    maxLength: {
                                        value: 200,
                                        message: "Não pode passar das 200 characters"
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.closeServices &&
                                    toast.dark(
                                        errors.closeServices.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={picturesClass}>
                                {t("uploadPics")}:
                            </label>
                            <input
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0 bg-white"
                                type="file"
                                multiple
                                accept="image/*"
                                {...register("houseImages", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("uploadPics")
                                    }
                                })}
                            />
                            <p className="hidden">
                                {errors.houseImages &&
                                    toast.dark(
                                        errors.houseImages.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            {previewImages && (
                                <div className="grid grid-cols-8 gap-2 ml-20 mt-4">
                                    {previewImages.map((img, i) => {
                                        return (
                                            <div>
                                                <img
                                                    className="preview w-40 border-2 border-white"
                                                    src={img}
                                                    alt={"image-" + i}
                                                    key={i}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className="completeBtn items-center font-semibold inline-block"
                        type="submit"
                    >
                        {t("addOffer")}
                    </button>
                    <Link to="/profile">
                        <button className="completeBtn items-center font-semibold inline-block">
                            {t("cancel")}
                        </button>
                    </Link>
                </form>
            </div>
            <div style={{position: 'absolute', left: '45%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                    <CircleLoader color='#cccccc' loading={loading} size={150} />
            </div>
            <Footer />
        </div>
    );
}
