import { useElements, useStripe } from "@stripe/react-stripe-js";
import React from 'react'
import { Button } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm(){




    const stripe = useStripe()
    const elements = useElements()

    const handlepayment = async()=>{
        let {error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/"
            }
        })

        if (error){
            console.log(error)
        }
    }

    return(
        <div style={{margin:"100px auto" , width:"60%"}}>
            <PaymentElement/>
            <Button  onClick={handlepayment} variant="contained" fullWidth>Pay</Button>
            </div>
    )
}