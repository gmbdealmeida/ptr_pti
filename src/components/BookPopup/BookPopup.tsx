import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from 'react-select';
import "./BookPopup.css";
import 'react-dates/initialize';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from "moment";
import payment from "../../routes/payment-page/payment"

import 'react-dates/lib/css/_datepicker.css';
import { Link, Redirect } from "react-router-dom";
import { privateDecrypt } from "crypto";


export default function BookPopup(props: any) {
    const { t } = useTranslation()
    const [accept, setAccept] = useState(false)
    const [page, setPage] = useState(props.pop)
    const [payType, setPayType] = useState("")
    const [startDate, setStartDate] = useState< Moment | null >(null)
    const [endDate, setEndDate] = useState< Moment | null >(null)
    const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate')
    const [isFocused, setIsFocused] = useState <FocusedInputShape|boolean>(false)
    const [startM, setStartM] = useState(0)
    const [endM, setEndM] = useState(0)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [showBack, setShowBack] = useState(false)

    function handleClick() {
        console.log("CLICKED!")
        props.toggle();
    };

    function handleChange() {
        // console.log(startDate)
        // console.log(endDate)
        // const value = event.target.value
        // console.log("VALUE: " + value)
        // setRange(value)
    }

    const containerStyles = {
        maxWidth: 400,
    };

    let session = localStorage.getItem("accountType") //SUBSTITUIR POR SESSION A SERIO

    function sessionType(){
        const words = []
        if (session === "Student"){
            words.push(t("complete-your-booking"))
            words.push(t("minReservation"))
            words.push(t("choose-dates"))
            words.push(t("rentalPrice"))
            words.push("/"+t("month"))
        }
        else{
            words.push(t("complete-your-hire"))
            words.push(t("minHire"))
            words.push(t("choose-dates-hire"))
            words.push(t("priceHour"))
            words.push("")
        }
        return(
            words
        )
    }

    function whatToShow() {
        if (localStorage.getItem("authenticated") !== "true") {
            return(
                <Redirect to={"/login?redirect=/house?" + window.location.search.substring(1)}/>
            )
        }
        if (page === "info") {
            return (
                <div className="m-4">
                    <form>
                        <h3 className="font-bold text-dark_blue text-xl text-center">{sessionType()[0]}:</h3>
                        <br />
                        <p className="label">{sessionType()[1]}</p>
                        <br />
                        <label className="label">{sessionType()[2]}</label>
                        <div className="max-w-md ml-4 mt-3 mb-3">
                            <DateRangePicker
                                startDate={startDate} // momentPropTypes.momentObj or null,
                                startDateId="startDate" // PropTypes.string.isRequired,
                                endDate={endDate} // momentPropTypes.momentObj or null,
                                endDateId="endDate" // PropTypes.string.isRequired,
                                startDatePlaceholderText={t("from")} //PropTypes.string,
                                endDatePlaceholderText={t("to")} //PropTypes.string,
                                onDatesChange={({ startDate, endDate }) => {
                                    setStartDate(startDate)
                                    setEndDate(endDate)
                                    if (startDate != null){
                                       setStartM((startDate as Moment).month())
                                       setStart((startDate as Moment).format("LL"))
                                       setShowBack(true)
                                    }
                                    if (endDate != null){
                                        setEndM((endDate as Moment).month())
                                        setEnd((endDate as Moment).format("LL"))
                                     }
                                     
                                    
                                }} // PropTypes.func.isRequired,
                                isDayBlocked={(day: Moment) => {
                                    if (day.isBefore()){
                                        return true
                                    }else{
                                        return false
                                    }
                                }}
                                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                            />
                        </div>
                        <p className="label">
                            {sessionType()[3]}:
                            {props.price}€{sessionType()[4]}
                        </p>
                        
                        <p className="label">{t("yourTotal")}: {((endM - startM) * props.price)}€</p>
                        <p className="label">{t("acceptTerms")}
                            <a onClick={() => setPage("terms")} className="link text-salmon">{t("terms")}</a>
                        ?</p>
                        <div className="accountType justify-around mt-3">
                            <label className="inline-flex items-center mr-3">
                                <input
                                    className="form-radio text-black"
                                    type="radio"
                                    name="accept"
                                    onChange={() => setAccept(true)}
                                />
                                <span className="ml-2 ">{t("yes")}</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    className="form-radio text-black"
                                    type="radio"
                                    name="accept"
                                    onChange={() => setAccept(false)}
                                />
                                <span className="ml-2 ">{t("no")}</span>
                            </label>
                        </div>

                        <button 
                            onClick={() => {
                                setPage("payType")
                                handleChange()
                            }} 
                            className="contBtn h-8 w-24 float-right mb-4 mr-4" type="submit" 
                            disabled={accept == false}
                        >{t("confirm")}
                        </button>

                    </form>
                </div>
            )
        } else if (page === "terms") {
            return (
                <div >
                    <h3 className="font-bold text-dark_blue text-xl ml-4">{t("terms")}:</h3>

                    <p className="max-h-80 overflow-auto m-4">Welcome to Website Name!

                    These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.

                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.

                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.

                    Cookies
                    We employ the use of cookies. By accessing Website Name, you agreed to use cookies in agreement with the Company Name's Privacy Policy.

                    Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.

                    License
                    Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Website Name. All intellectual property rights are reserved. You may access this from Website Name for your own personal use subjected to restrictions set in these terms and conditions.

                    You must not:

                    Republish material from Website Name
                    Sell, rent or sub-license material from Website Name
                    Reproduce, duplicate or copy material from Website Name
                    Redistribute content from Website Name
                    This Agreement shall begin on the date hereof.

                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Company Name does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Company Name,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Company Name shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.

                    Company Name reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

                    You warrant and represent that:

                    You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
                    The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;
                    The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy
                    The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.
                    You hereby grant Company Name a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.

                    Hyperlinking to our Content
                    The following organizations may link to our Website without prior written approval:

                    Government agencies;
                    Search engines;
                    News organizations;
                    Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and
                    System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
                    These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.

                    We may consider and approve other link requests from the following types of organizations:

                    commonly-known consumer and/or business information sources;
                    dot.com community sites;
                    associations or other groups representing charities;
                    online directory distributors;
                    internet portals;
                    accounting, law and consulting firms; and
                    educational institutions and trade associations.
                    We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Company Name; and (d) the link is in the context of general resource information.

                    These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.

                    If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Company Name. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.

                    Approved organizations may hyperlink to our Website as follows:

                    By use of our corporate name; or
                    By use of the uniform resource locator being linked to; or
                    By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.
                    No use of Company Name's logo or other artwork will be allowed for linking absent a trademark license agreement.

                    iFrames
                    Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.

                    Content Liability
                    We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.

                    Reservation of Rights
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.

                    Removal of links from our website
                    If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.

                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.

                    Disclaimer
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:

                    limit or exclude our or your liability for death or personal injury;
                    limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                    limit any of our or your liabilities in any way that is not permitted under applicable law; or
                    exclude any of our or your liabilities that may not be excluded under applicable law.
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.

                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                    <button onClick={() => setPage("info")} className="contBtn float-right m-2" type="submit" >{t("back")}</button>
                </div>
            )
        } else {
            return (
                <form className="m-4">
                    <label>
                        <input
                            className="form-radio text-black"
                            type="radio"
                            name="payType"
                            onChange={() => setPayType("paypal")}
                        />
                        <span className="ml-2 ">PayPal</span>
                    </label>
                    <br/>
                    <label>
                        <input
                            className="form-radio text-black"
                            type="radio"
                            name="payType"
                            onChange={() => setPayType("creditCard")}
                        />
                        <span className="ml-2 ">{t("creditCard")}</span>
                    </label>
                    <br/>
                    <label>
                        <input
                            className="form-radio text-black"
                            type="radio"
                            name="payType"
                            onChange={() => setPayType("bankTransfer")}
                        />
                        <span className="ml-2 ">{t("bankTransfer")}</span>
                    </label>
                    <br/>
                    {showBack ? <button onClick={() => setPage("info")} className="contBtn float-left mt-6 mb-2" type="button" >{t("back")}</button> : null}
                    
                    <Link to={{
                        pathname: '/payment', state: {
                            amount: props.price,
                            startDate: start,
                            endDate: end,
                            paytype: payType,
                            address: props.address,
                            ownerName: props.ownerName,
                            ownerId: props.ownerId,
                            title: props.title,
                            houseId: props.houseId,
                            rules: props.rules,
                            ownerEmail: props.ownerEmail,
                            ownerPhone : props.ownerPhone,
                            type: props.type,
                            contractId: props.contractId
                        }
                    }}>
                        <button className="contBtn float-right mt-6 mb-2" type="button" >{t("pay")}</button>
                    </Link>
                </form >
            )
        }
    }
    return (
        <div className="bg-white rounded-lg modalBook centerBook">
            {whatToShow()}
        </div>
    )
}