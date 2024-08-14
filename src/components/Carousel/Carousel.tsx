import React, { ComponentProps, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";
import SwiperCore, { Autoplay, Navigation, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { BiMap } from "react-icons/bi"

interface Houses {
    address: string;
    area: number;
    closeServices: string;
    commodities: string;
    coordinates: string;
    created_at: string;
    dateAvailable: string;
    description: string;
    hostId: number;
    houseRules: string;
    houseType: string;
    id: number;
    installations: string;
    location: string;
    maxPeopleNum: number;
    pictures: string;
    rating: string;
    rent: number;
    roomsNum: number;
    spaceType: string;
    timesRated: number;
    title: string;
    updated_at: string;
}

export default function Carousel(props: any) {
    /*
    info que temos que retirar da base de dados para usar no carrousel por casa
    a var "myDate" que se encontra imediatamente abaixo também será mudada
    */
    var imagem = "https://picsum.photos/600/400/?random";
	
    //Variavel onde vao estar as casas apresentadas
	
    SwiperCore.use([Navigation]);
	const [controlledSwiper, setControlledSwiper] = useState<any>(null);
	
	
	function createSwiperSlide() {
		if(props.houses) {
			for (let i = 0; i < props.houses.length; i++) {
				const value = props.houses[i];
                const housePicsArray = value.pictures.split(" ")
				controlledSwiper.appendSlide(
					`<div class="swiper-slide" key=${value.id}>
						<div class="container mt-1 mb-2 mx-auto">
							<div class="flex flex-wrap justify-center">
								<div class="my-1 px-1">
									<article class="overflow-hidden rounded-lg shadow-lg">
										<a href="/house?id=${value.id}">
											<img
											class="block max-h-64 max-w-48"
												alt="Placeholder"
												src=${housePicsArray[0]}
											/>
										</a>
		
										<header class="flex items-center justify-between leading-tight p-2 md:p-4">
											<h1 class="text-lg">
												<a
												class="no-underline hover:underline text-black text-base"
													href="/house?id=${value.id}"
												>
													${value.title}
												</a>
											</h1>
											<p class="text-grey-darker text-sm ">
												${value.dateAvailable}
											</p>
										</header>
		
										<footer class="flex items-center justify-between leading-none p-2 md:p-4">
											<a
											class="flex items-center no-underline hover:underline text-black"
												href="/search?location=${value.location}"
											>
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12,14c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S9.794,14,12,14z M12,8c1.103,0,2,0.897,2,2s-0.897,2-2,2 s-2-0.897-2-2S10.897,8,12,8z"></path><path d="M11.42,21.814C11.594,21.938,11.797,22,12,22s0.406-0.062,0.58-0.186C12.884,21.599,20.029,16.44,20,10 c0-4.411-3.589-8-8-8S4,5.589,4,9.995C3.971,16.44,11.116,21.599,11.42,21.814z M12,4c3.309,0,6,2.691,6,6.005 c0.021,4.438-4.388,8.423-6,9.73C10.389,18.427,5.979,14.441,6,10C6,6.691,8.691,4,12,4z"></path></svg>
												<p class="ml-2 text-base">
													${value.location}
												</p>
											</a>
										</footer>
									</article>
								</div>
							</div>
						</div>
					</div>`
				)
			}
		}
	}
    createSwiperSlide()
	
    return (
        // modules navigation, Mousewheel Control, Responsive Breakpoints
        <div className="mt-20">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold text-dark_blue ml-8 mb-4">
                    {props.filter}
                </h1>
                <Link className="text-salmon mr-8" to={`/search?filter=${props.filter}`} /*add params*/>
                    See All
                </Link>
            </div>
            <Swiper
                className="mb-6"
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
				onSwiper={(swiper) => setControlledSwiper(swiper)}
                onReachEnd={(e) => {
                    e.slides[0] && e.appendSlide([
                    '<div class="swiper-slide">' + e.slides[0].innerHTML + '</div>',
                    '<div class="swiper-slide">' + e.slides[1].innerHTML + '</div>',
                    '<div class="swiper-slide">' + e.slides[2].innerHTML + '</div>',
                    '<div class="swiper-slide">' + e.slides[3].innerHTML + '</div>',
                    '<div class="swiper-slide">' + e.slides[4].innerHTML + '</div>',
                    '<div class="swiper-slide">' + e.slides[5].innerHTML + '</div>'])
                }}
                //spaceBetween needs to be fixed to appropriate size
                breakpoints={{
                    720: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1366: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    1680: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                    },
                }}
            >	
            </Swiper>
        </div>
    );

}
