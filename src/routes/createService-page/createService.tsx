import React, { useState } from "react";
import "./createService.css";
import { useTranslation } from "react-i18next";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Controller, useForm } from "react-hook-form";
//import { AddService } from "../../_services/api";
import { toast } from "react-toastify";

type OptionType = {
    label: string;
    value: any;
}

export default function CreateService() {
    const { t } = useTranslation();
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm()

    const watchServiceImages = watch(['serviceImage'])

    const feebackBoxStyling = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        draggable: true,
        toastId: "You have an error in your form.",
    };

    let titleClass = "font-bold text-lg ";
    let locationClass = "font-bold text-lg ";
    let priceHourClass = "font-bold text-lg ";
    let maxHourDayClass = "font-bold text-lg ";
    let minHourDayClass = "font-bold text-lg ";
    let serviceTypeClass = "font-bold text-lg ";
    let daysOffClass = "font-bold text-lg ";
    let descriptionClass = "font-bold text-lg ";
    let dateAvailableClass = "font-bold text-lg ";
    let picturesClass = "font-bold text-lg ";

    if (errors.title) {
        titleClass += "border-red-800";
    } else {
        titleClass += "border-white";
    }

    if (errors.location) {
        locationClass += "text-maroon";
    } else {
        locationClass += "text-dark_blue";
    }

    if (errors.priceHour) {
        priceHourClass += "text-maroon";
    } else {
        priceHourClass += "text-dark_blue";
    }

    if (errors.maxHourDay) {
        maxHourDayClass += "text-maroon";
    } else {
        maxHourDayClass += "text-dark_blue";
    }

    if (errors.minHourDay) {
        minHourDayClass += "text-maroon";
    } else {
        minHourDayClass += "text-dark_blue";
    }

    if (errors.serviceType) {
        serviceTypeClass += "text-maroon";
    } else {
        serviceTypeClass += "text-dark_blue";
    }

    if (errors.daysOff) {
        daysOffClass += "text-maroon";
    } else {
        daysOffClass += "text-dark_blue";
    }

    if (errors.description) {
        descriptionClass += "text-maroon";
    } else {
        descriptionClass += "text-dark_blue";
    }

    if (errors.dateAvailable) {
        dateAvailableClass += "text-maroon";
    } else {
        dateAvailableClass += "text-dark_blue";
    }

    if (errors.serviceImages) {
        picturesClass += "text-maroon";
    } else {
        picturesClass += "text-dark_blue";
    }

    const errorSubmit = () => toast.dark("Error on submitting, please try again", feebackBoxStyling);

    const onSubmit = (data: any) => {
        // missing data validation
        console.log(data);
        createService(data)
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.log(err);
        //     errorSubmit()
        // });
    };

    function createService(data: any) {
        // parse data before promise
        //let promise = new Promise((resolve, reject) => {
        //toBase64Array(data.houseImages)
        //  .then(pictures => {
        //      let serviceType = data.serviceType.value
        //      let daysOff = ""
        //      data.daysOff.forEach((element: any) => {
        //          daysOff += element.value + " "    
        //      });
        //      let dateAvailable = new Date(data.dateAvailable).toLocaleDateString('ko-KR').replace(/. /g, "/").replace(".", "").trim().replace("\n", "").toString()
        //      AddService(
        //          data.location,
        //          data.priceHour,
        //          data.maxHourDay,
        //          data.minHourDay,
        //          serviceType,
        //          daysOff,
        //          data.description,
        //          dateAvailable,
        //          pictures
        //          
        //      )
        //          .then(res => {
        //              console.log(res)
        //          })
        //          .catch(err => console.log(err))
        // })
        //.catch(err => console.log(err))
        //})
        //return promise;
    }
    // const toBase64Array = (fileArray: any) =>
    //     new Promise<string>(async (resolve, reject) => {
    //         console.log(fileArray)
    //         let base64Files = ''
    //         for (let i = 0; i < fileArray.length; i++) {
    //             let fileString = await toBase64(fileArray[i])
    //             base64Files += fileString
    //                 + " "
    //         }
    //         resolve(base64Files)
    //     })

    // const toBase64 = (file: any) =>
    //     new Promise<string>((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result as string);
    //         reader.onerror = (error) => reject(error);
    //     });

    let images: string[] = [];

    for (let i = 0; i < watchServiceImages[0]?.length; i++) {
        images.push(URL.createObjectURL(watchServiceImages[0][i]));
    }

    let previewImages = watchServiceImages[0] ? images : undefined;

    const Service = [
        { label: t("cleaner"), value: "cleaner" },
        { label: t("plumber"), value: "plumber" },
        { label: t("electrician"), value: "electrician" },
        { label: t("ironing"), value: "ironing" },
        { label: t("windowCleaner"), value: "windowCleaner" },
        { label: t("tecnic"), value: "tecnic" },
        { label: t("cook"), value: "cook" },
        { label: t("painter"), value: "painter" },
        { label: t("gardener"), value: "gardener" }
    ]
    const DaysOff: OptionType[] = [
        { label: t("monday"), value: "monday" },
        { label: t("tuesday"), value: "tuesday" },
        { label: t("wednesday"), value: "wednesday" },
        { label: t("thursday"), value: "thursday" },
        { label: t("friday"), value: "friday" },
        { label: t("saturday"), value: "saturday" },
        { label: t("sunday"), value: "sunday" }
    ]

    return (
        <div className="bg-main h-full w-full">
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
                            <label className={priceHourClass}>
                                {t("priceHour")}:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                type="number"
                                placeholder={t("priceHour")}
                                {...register("priceHour", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("priceHour")
                                    }
                                })}
                            />
                            <p className="hidden">
                                {errors.priceHour &&
                                    toast.dark(
                                        errors.priceHour.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>

                        <div className="flex-1 mx-12">
                            <label className={locationClass}>
                                {t("location")}:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                type="text"
                                placeholder={t("location")}
                                {...register("location", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("location")
                                    }
                                })}
                            />
                            <p className="hidden">
                                {errors.location &&
                                    toast.dark(
                                        errors.location.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            <br />
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
                        <div className="flex-1 flex flex-col md:flex-row">
                            <div className="flex-1 mx-12">
                                <label className={maxHourDayClass}>
                                    {t("maxHourDay")}:
                                </label>
                                <input
                                    className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("maxHourDay")}
                                    {...register("maxHourDay", {
                                        required: {
                                            value: true,
                                            message: t("pleaseFill") + t("maxHourDay")
                                        }
                                    })}
                                />
                                <p className="hidden">
                                    {errors.maxHourDay &&
                                        toast.dark(
                                            errors.maxHourDay.message,
                                            feebackBoxStyling
                                        )}
                                </p>
                            </div>
                            
                            <div className="flex-1 mx-12">
                                <label className={minHourDayClass}>
                                    {t("minHourDay")}:
                                </label>
                                <input
                                    className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("minHourDay")}
                                    {...register("minHourDay", {
                                        required: {
                                            value: true,
                                            message: t("pleaseFill") + t("minHourDay")
                                        }
                                    })}
                                />
                                <p className="minHourDay">
                                    {errors.minHourDay &&
                                        toast.dark(
                                            errors.minHourDay.message,
                                            feebackBoxStyling
                                        )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mx-12">
                            <label className={serviceTypeClass}>
                                {t("serviceType")}:
                                </label>
                            <Controller
                                name="serviceType"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("serviceType")
                                    },
                                }}
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        inputRef={ref}
                                        className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                        options={Service}
                                        placeholder={t("select")}
                                        onChange={val => onChange(val)}
                                    />
                                )}
                            />
                            <p className="hidden">
                                {errors.serviceType &&
                                    toast.dark(
                                        errors.serviceType.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                        <div className="flex-1 mx-12">
                            <label className={daysOffClass}>
                                {t("daysOff")}:
                                    </label>
                            <Controller
                                name="daysOff"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("daysOff"),
                                    },
                                }}
                                render={({
                                    field: { onChange, value, ref },
                                }) => (
                                    <Select
                                        inputRef={ref}
                                        className="w-full md:w-full border-none rounded-xl shadow-marta bg-white my-4"
                                        options={DaysOff}
                                        isMulti
                                        placeholder={t("select")}
                                        onChange={val => onChange(val)}
                                    />
                                )}
                            />
                            <p className="hidden">
                                {errors.daysOff &&
                                    toast.dark(
                                        errors.daysOff.message,
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
                                        value: 200,
                                        message: "Não pode passar das 200 characters"
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
                            <label className={picturesClass}>
                                {t("uploadPics")}:
                                </label>
                            <input
                                className="w-full md:w-full border-none rounded-xl shadow-marta my-4 focus:ring-0 bg-white"
                                type="file"
                                multiple
                                accept="image/*"
                                {...register("serviceImages", {
                                    required: {
                                        value: true,
                                        message: t("pleaseFill") + t("uploadPics")
                                    }
                                })}
                            />
                            <p className="hidden">
                                {errors.serviceImages &&
                                    toast.dark(
                                        errors.serviceImages.message,
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
            <Footer />
        </div>
    )
}