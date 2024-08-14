import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import "./HousePicsSwiper.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function HousePicsSwiper(props: any){
    
    let slides = []
    
    for (let i = 0; i < props.pics.length; i++){
        slides.push(
            <SwiperSlide>
                <img
                    className="img max-h-96"
                    src={props.pics[i]}
                />
            </SwiperSlide>
        )
    }

    return(   
        <Swiper
            className="swiper"
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {slides}
        </Swiper>
    )
}

export default HousePicsSwiper