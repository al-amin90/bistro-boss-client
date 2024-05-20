import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import quart from "../../../assets/quart.png"

const Testimonial = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get('/reviews.json')
            .then(res => {
                setReviews(res.data)
            })
    }, [])
    console.log(reviews);

    return (
        <section className='w-[90%] my-28 md:w-[80%] mx-auto'>
            <SectionTitle
                color={"black"}
                subHeading={"What Our Clients Say"}
                heading={"TESTIMONIALS"}
            ></SectionTitle>


            <Swiper
                navigation={true}
                autoplay={true}
                loop={true}
                modules={[Navigation]}
                className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}>
                        <div className='px-32 text-center flex items-center justify-center flex-col'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <img className='my-10' src={quart} alt="" />
                            <p >{review.details}</p>
                            <h3 className='text-3xl mt-4 text-[#CD9003]'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonial;