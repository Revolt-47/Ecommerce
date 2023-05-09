const express = require("express")
helmet = require("helmet")
cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const upload = require("express-fileupload")


require("dotenv").config()

const stripe = require('stripe')(process.env.SECRET_KEY)

mongoose.connect(process.env.MONGO_DB_URI , {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err))



const userRoutes = require("./Routes/userRoutes")
const itemRoutes = require("./Routes/itemRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const { verifyTokenExiry } = require("./utils/Authenticate")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(upload())
app.use('/static',express.static("uploads"))

app.use(helmet())
app.use(cors({
    origin: "*"
}))

app.use("/api/user" , userRoutes)
app.use("/api/item" , itemRoutes)
app.use("/api/order" , orderRoutes)


app.get("/api" , (req , res)=>{
    res.send("Hello World")
});

app.listen(3001, ()=>{
    console.log("App lisyemomng on port 3000");
})


app.get("/stripeconfig",(req,res)=>{
    res.json({
        publishablekey:process.env.STRIPE
    })
})


app.post("/create-payment",async(req,res)=>{
    try{
        let paymentintent = await stripe.paymentIntents.create({
            amount : 1099,
            currency : 'usd',
            payment_method_types : ['card']
        });

        res.json({clientSecret:paymentintent.client_secret})
    }catch(err){
        res.json({err})
    }
})


app.get("/verify" , verifyTokenExiry)

    
