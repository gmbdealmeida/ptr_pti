import React, { InputHTMLAttributes, useEffect, useState } from "react";
import "./completeRegister.css";
import { useTranslation } from "react-i18next";
import DatePicker from "react-date-picker";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import EmptyProfilePic from "../../assets/blank-profile-picture.png";
import { ImCamera } from "react-icons/im";
import { Controller, useForm } from "react-hook-form";
import { GetProfile, UpdateUser } from "../../_services/api";
import { toast } from "react-toastify";
import moment from "moment";
import { useHistory } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input, List } from "antd";

export default function CompleteRegister() {
    const { t } = useTranslation();
    const history = useHistory();
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        useGoogle({
            apiKey: process.env.REACT_APP_GOOGLE,
        });
    const [isListVisible, setIsListVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();

    const watchProfileImage = watch(["profileImage"]);

    const feebackBoxStyling = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        draggable: true,
        toastId: "You have an error in your form.",
    };

    let profileImageClass = "preview w-40 h-40 border-2 rounded-full ";
    let profileClass = "font-bold text-lg ";
    let nameClass = "font-bold text-lg ";
    let birthdayClass = "font-bold text-lg ";
    let phoneClass = "font-bold text-lg ";
    let accountTypeClass = "font-bold text-lg ";
    let genderClass = "font-bold text-lg ";
    let addressClass = "font-bold text-lg ";
    let bankAccountClass = "font-bold text-lg ";

    if (errors.profileImage) {
        profileImageClass += "border-red-800";
        profileClass += "text-maroon";
    } else {
        profileImageClass += "border-white";
        profileClass += "text-dark_blue";
    }

    if (errors.name) {
        nameClass += "text-maroon";
    } else {
        nameClass += "text-dark_blue";
    }

    if (errors.birthday) {
        birthdayClass += "text-maroon";
    } else {
        birthdayClass += "text-dark_blue";
    }

    if (errors.phone) {
        phoneClass += "text-maroon";
    } else {
        phoneClass += "text-dark_blue";
    }

    if (errors.accountType) {
        accountTypeClass += "text-maroon";
    } else {
        accountTypeClass += "text-dark_blue";
    }

    if (errors.gender) {
        genderClass += "text-maroon";
    } else {
        genderClass += "text-dark_blue";
    }

    if (errors.address) {
        addressClass += "text-maroon";
    } else {
        addressClass += "text-dark_blue";
    }

    if (errors.bankAccount) {
        bankAccountClass += "text-maroon";
    } else {
        bankAccountClass += "text-dark_blue";
    }

    const errorSubmit = () =>
        toast.dark("Error on submitting, please try again", feebackBoxStyling);

    const errorAddressSubmit = () =>
        toast.dark("Please pick one of the addresses.", feebackBoxStyling);

    const onSubmit = (data: any) => {
        if (isListVisible) {
            errorAddressSubmit();
        } else {
            completeRegister(data)
                .then((res) => {
                    history.push("/home");
                })
                .catch((err) => {
                    console.log(err);
                    errorSubmit();
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

    function completeRegister(data: any) {
        /*
        Parte do Feedback
        */
        const accountSucessfullyUpdated = () =>
            toast.dark("Account sucessfully updated!", feebackBoxStyling);
        /*
       Fim do setup do feedback
        */
        setLoading(true);
        let promise = new Promise((resolve, reject) => {
            toBase64(data.profileImage[0])
            .then((avatar) => {
                let birthday = new Date(data.birthday)
                    .toLocaleDateString("ko-KR")
                    .replace(/. /g, "/")
                    .replace(".", "")
                    .trim()
                    .replace("\n", "")
                    .toString();
                    console.log(data)
                UpdateUser(
                    data.accountType,
                    data.name,
                    birthday,
                    data.address,
                    data.bankAccount,
                    data.phone,
                    avatar,
                    data.gender
                )
                    .then((res) => {
                        GetProfile()
                            .then((res: any) => {
                                console.log(res);
                                localStorage.setItem(
                                    "userData",
                                    JSON.stringify(res.data.user)
                                );
                                //FEEDBACK
                                accountSucessfullyUpdated();
                                resolve(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        setLoading(false);
                        reject(err);
                    });
            });
        });
        return promise;
    }

    let previewImage =
        watchProfileImage[0] && watchProfileImage[0]?.length > 0
            ? URL.createObjectURL(watchProfileImage[0][0])
            : EmptyProfilePic;

    let calendarLocale: string;
    if (localStorage.getItem("i18nextLng") === "pt") {
        calendarLocale = "pt-PT";
    } else {
        calendarLocale = "en-EN";
    }

    return (
        <div className="bg-main">
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mx-20 md:mx-36 lg:mx-48">
                    <div className="flex-grow mt-8 mb-16">
                        <h1 className="text-dark_blue font-bold text-3xl text-center">
                            {t("pleaseComplete")}
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                            <label className={nameClass}>
                                {t("fullName")}*:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-9/12 border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                type="text"
                                placeholder={t("name")}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Please fill name",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Name must have atleast 3 or more letters",
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.name &&
                                    toast.dark(
                                        errors.name.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                            <br />
                            <label className={birthdayClass}>
                                {t("birthday")}*:
                            </label>
                            <br />
                            <Controller
                                name={"birthday"}
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please fill your birthday",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        className="w-full md:w-9/12 border-none rounded-xl shadow-marta bg-white px-3 py-2 my-4"
                                        value={value}
                                        onChange={onChange}
                                        locale={calendarLocale}
                                        minDate={moment()
                                            .subtract(90, "years")
                                            .toDate()}
                                        maxDate={moment()
                                            .subtract(18, "years")
                                            .toDate()}
                                        defaultValue={moment()
                                            .subtract(18, "years")
                                            .toDate()}
                                        showLeadingZeros={true}
                                    />
                                )}
                            />
                            <p className="hidden">
                                {errors.birthday &&
                                    toast.dark(
                                        errors.birthday.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>

                        <div className="flex-1 order-first md:order-none">
                            <label className={profileClass}>
                                {t("profilePic")}*:
                            </label>
                            {previewImage && (
                                <div className="flex justify-center">
                                    <div className="relative text-white content-center">
                                        <img
                                            className={profileImageClass}
                                            src={previewImage}
                                            alt=""
                                        />
                                        <div className="icon">
                                            <label
                                                htmlFor="upload"
                                                className="cursor-pointer"
                                            >
                                                <ImCamera className="ml-36 text-4xl" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                {...register("profileImage", {
                                    required: {
                                        value: true,
                                        message: "Pick a profile Image",
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.profileImage &&
                                    toast.dark(
                                        errors.profileImage.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4">
                        <div className="flex-1">
                            <div className="flex flex-col">
                                <label className={phoneClass}>
                                    {t("phoneNum")}*:
                                </label>
                                <input
                                    className="w-full md:w-9/12 border-none rounded-xl shadow-marta my-4 focus:ring-0"
                                    type="number"
                                    placeholder={t("phone")}
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message:
                                                "Please fill your phone number",
                                        },
                                        minLength: {
                                            value: 9,
                                            message: "It must have 9 digits",
                                        },
                                        maxLength: {
                                            value: 9,
                                            message: "It must have 9 digits",
                                        },
                                    })}
                                />
                                <p className="hidden">
                                    {errors.phone &&
                                        toast.dark(
                                            errors.phone.message,
                                            feebackBoxStyling
                                        )}
                                </p>
                                <label className={addressClass}>
                                    {t("address")}*:
                                </label>
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
                                        <div className="w-full md:w-9/12 my-4">
                                            <Input.Search
                                                className="mb-3 focus:ring-0"
                                                enterButton={false}
                                                placeholder={t("address")}
                                                value={value}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                    getPlacePredictions({
                                                        input: e.target.value,
                                                        componentRestrictions: {
                                                            country: "pt",
                                                        },
                                                    });
                                                    setIsListVisible(true);
                                                }}
                                                loading={
                                                    isPlacePredictionsLoading
                                                }
                                            />
                                            {isListVisible && (
                                                <List
                                                    dataSource={
                                                        placePredictions
                                                    }
                                                    renderItem={(item) => (
                                                        <List.Item
                                                            onClick={() => {
                                                                onChange(
                                                                    item.description
                                                                );
                                                                setIsListVisible(
                                                                    false
                                                                );
                                                            }}
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
                        <div className="flex-1">
                            <label className={accountTypeClass}>
                                {t("accountType")}*:
                            </label>
                            <div className="mt-3 ml-4 pt-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="Student"
                                        {...register("accountType", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your account type",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("student")}
                                    </span>
                                </label>
                                <br />
                                <label className="inline-flex items-center my-6">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="Host"
                                        {...register("accountType", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your account type",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("host")}
                                    </span>
                                </label>
                                <br />
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="ServiceProvider"
                                        {...register("accountType", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your account type",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("serviceProvider")}
                                    </span>
                                </label>
                                <p className="hidden">
                                    {errors.accountType &&
                                        toast.dark(
                                            errors.accountType.message,
                                            feebackBoxStyling
                                        )}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className={genderClass}>
                                {t("gender")}*:
                            </label>
                            <div className="mt-3 ml-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="F"
                                        {...register("gender", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your gender",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("Feminine")}
                                    </span>
                                </label>
                                <br />
                                <label className="inline-flex items-center my-6">
                                    <input
                                        type="radio"
                                        className="form-radio text-dark_blue focus:ring-0"
                                        value="M"
                                        {...register("gender", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select your gender",
                                            },
                                        })}
                                    />
                                    <span className="ml-2 text-dark_blue font-bold">
                                        {t("masculine")}
                                    </span>
                                </label>
                                <br />
                                <p className="hidden">
                                    {errors.accountType &&
                                        toast.dark(
                                            errors.accountType.message,
                                            feebackBoxStyling
                                        )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 mb-20">
                        <div className="flex-1">
                            <label className={bankAccountClass}>
                                {t("bankAccount")}*:
                            </label>
                            <br />
                            <input
                                className="w-full md:w-9/12 border-none rounded-xl shadow-marta mt-4 focus:ring-0"
                                type="text"
                                placeholder={t("cardNum")}
                                {...register("bankAccount", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please fill your credit card number",
                                    },
                                    pattern: /[0-9]{16}[0-9]{3}?$/g, //this matches credit card numbers 1234-1234-1234-1234-123
                                    minLength: {
                                        value: 19,
                                        message:
                                            "Not a valid credit card number",
                                    },
                                    maxLength: {
                                        value: 19,
                                        message:
                                            "Not a valid credit card number",
                                    },
                                })}
                            />
                            <p className="hidden">
                                {errors.bankAccount &&
                                    toast.dark(
                                        errors.bankAccount.message,
                                        feebackBoxStyling
                                    )}
                            </p>
                        </div>
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
                                loading={loading}
                                size={150}
                            />
                        </div>
                        <div className="flex-1 flex justify-center items-end">
                            <button
                                className="items-center text-xl font-semibold w-3/5 shadow-marta focus:outline-none bg-beige_a_morrer py-2 px-3 rounded-xl hover:bg-dark_blue hover:text-white mt-16 md:mt-0"
                                type="submit"
                            >
                                {t("complete")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
}
