import { useEffect, useState } from "react";
import React from "react";
import {Elements} from "@stripe/react-stripe-js"
import CheckoutForm from "../Components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";



export default function Payment(){

    const [Stripe , setStripe] = useState('')
    const [clientsecret , setclientsecret] = useState('')


    useEffect(()=>{
        fetch("http://localhost:3001/stripeconfig").then((res)=>res.json())
        .then((data)=>setStripe(loadStripe(data.publishablekey)))
    },[])

    useEffect(()=>{
        fetch("http://localhost:3001/create-payment",{
            method:"Post",
            headers:{
                "Content-type":"Application/Json"
            },
            body:JSON.stringify({})
        }).then((res)=>res.json())
        .then((data)=>setclientsecret(data.clientSecret))
    },[])


    return (

        <>
        {Stripe && clientsecret ? 
        
            <Elements stripe = {Stripe} options={{clientSecret : clientsecret}}>
            <CheckoutForm />
            </Elements>:<></>}
        </>

    )
}

