import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './category.css'

import slider1 from "../../../assets/home/slide1.jpg"
import slider2 from "../../../assets/home/slide2.jpg"
import slider3 from "../../../assets/home/slide3.jpg"
import slider4 from "../../../assets/home/slide4.jpg"
import slider5 from "../../../assets/home/slide5.jpg"
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='w-[90%] my-28 md:w-[80%] mx-auto '>
            <div className='text-black'>
                <SectionTitle
                    heading={"ORDER ONLINE"}
                    subHeading={"From 11:00am to 10:00pm"}
                ></SectionTitle>
            </div>


            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                autoplay={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='relative'>
                    <img src={slider1} alt="" />
                    <p className='text-2xl bottom-4 shadow-lg left-1/2 -translate-x-1/2 absolute text-white uppercase  font-cinzle text-center'>Salads</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="" />
                    <p className='text-2xl bottom-4 shadow-lg left-1/2 -translate-x-1/2 absolute text-white uppercase  font-cinzle text-center'>pizzas</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <p className='text-2xl bottom-4 shadow-lg left-1/2 -translate-x-1/2 absolute text-white uppercase  font-cinzle text-center'>Soups</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="" />
                    <p className='text-2xl bottom-4 shadow-lg left-1/2 -translate-x-1/2 absolute text-white uppercase  font-cinzle text-center'>desserts</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="" />
                    <p className='text-2xl bottom-4 shadow-lg left-1/2 -translate-x-1/2 absolute text-white uppercase  font-cinzle text-center'>Salads</p>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Category;