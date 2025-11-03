import express from "express" 
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()



app.use(cors({
    origin: true,   // dynamically reflect the origin of the request
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}))

app.use(express.json({limit:"16KB"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Backend server is running',
        timestamp: new Date().toISOString()
    });
});

import userRouter from "./router/user.router.js"
//import productRouter from "./router/product.router.js"
import productRouter from "./router/product.router.js"
app.use("/user",userRouter)
app.use("/product", productRouter)






export default app;