import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutFrom from './CheckOutFrom';

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading="Payment"
                    subHeading="Please pay to eat"
                ></SectionTitle>
            </div>


            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;