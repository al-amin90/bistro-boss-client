import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import './style.css'
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckOutFrom = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const navigate = useNavigate()
    const price = cart.reduce((total, item) => total + item.price, 0)


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price])


    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log(confirmError, 'confirm error');
        } else {
            console.log(paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("tandiation id", paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }

            // now save the payment in the database
            const payment = {
                email: user?.email,
                price: price,
                transactionId: paymentIntent.id,
                data: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: "pending"
            }

            const { data } = await axiosSecure.post('/payments', payment);
            console.log('payment saved', data);
            refetch()
            if (data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is Added to the menu!`,
                    showConfirmButton: false,
                    timer: 15000
                });
                navigate('/dashboard/paymentHistory')
            }
        }
    }

    return (
        <form className='' onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='flex items-center justify-center'>
                <button className='bg-[#570DF8] mt-14 btn text-white w-1/3'
                    type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className='text-red-600 text-center mt-10' >{error}</p>
            {transactionId && <p className='text-green-600 text-center mt-10' >Your TransactionId is {transactionId}</p>}
        </form>
    );
};

export default CheckOutFrom;