import Ratings from "react-ratings-declarative";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusSquare } from "react-icons/bs";
import Select from "react-select";
import "./RatingPopup.css";


import { GetReviewById } from "../../_services/api";

export default function RatingPopup(props: any) {

  //WARNING THIS IS BROKEN, ESPERAR PELO BACKEND E DEPOIS FAZER
  //COMEÇAR POR VER O QUE É QUE O BACKEND DEVOLVE
  
  
  //https://www.npmjs.com/package/react-ratings-declarative
  // use this artur
  const { t } = useTranslation();
  const [alreadyRated, setAlreadyRated] = useState(false);
  const [rating, setRating] = useState("");
  const [allReviews, setAllReviews] = useState([]);

  function changeRating(newRating: any) {
    setRating(newRating);
  }

//   function isRated(idHouse: any) {
//     console.log("entrou aqui");
//     GetReviewById(idHouse)
//       .then((res) => {
//         let reviewsArray = [];
//         if (typeof res.data.review === "object") {
//           for (var key in res.data.review) {
//             if (res.data.review.hasOwnProperty(key)) {
//               reviewsArray.push(res.data.review[key]);
//             }
//           }
//           console.log("onde q");
//         } else {
//           reviewsArray = res.data.review;
//         }
//         setAllReviews(reviewsArray);
//         console.log("onde qqqq");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     return (
//       <div>
//         <h1> All Reviews</h1>
//       </div>
//     );
//   }

  function whatToShow() {
    var newRating = 3;
    
    return (
      <Ratings
        rating={rating}
        widgetRatedColors="blue"
        changeRating={changeRating(newRating)}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget
          widgetDimension="60px"
          svgIconViewBox="0 0 5 5"
          svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
        />
        <Ratings.Widget widgetHoverColor="black" />
        <Ratings.Widget />
      </Ratings>
    );
  }

  //RETURN FINAL DO POPUP
  return (
    <div className="bg-main">
      <div className="bg-white rounded-lg m-20 bg-opacity-75">
        <div className="mt-20 divide-y divide-gray-300 ml-5 mr-5">
          {/* {isRated(1)} */}
          {whatToShow()}
        </div>
      </div>
    </div>
  );
}
