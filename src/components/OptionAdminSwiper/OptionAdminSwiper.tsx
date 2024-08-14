import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./OptionAdminSwiper.css";
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function OptionAdminSwiper(props: any){
    let slides = []
    for (let i = 0; i < props.nameSlide.length; i++){
        
        slides.push(
            <SwiperSlide>
                <Link to={props.nameLink[i]}>
                    <button>
                        <p className="text-new_blue text-base font-semibold m-2">{props.nameSlide[i]}</p>
                        <img
                            className="rounded-lg shadow-2xl imgAdmin "
                            src={props.pics[i]}
                        />
                    </button>
                </Link>
            </SwiperSlide>
        )
    }

    return(   
        <Swiper
            className="swiperAdmin"
            spaceBetween={30}
            slidesPerView={5}
            centeredSlides={true}
            grabCursor={true}
            /*loop={true}*/
            /*navigation*/
            pagination={{ el: '.swiper-pagination', clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {slides}
        </Swiper>
    )
}

export default OptionAdminSwiper