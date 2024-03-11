import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// normal JSON data
app.use(express.json())
// data coming from URL changes, so we want encoder for URLs too
app.use(express.urlencoded({extended: true}))
// for public assests
app.use(express.static("public"))
// for secure keys
app.use(cookieParser())

// routes import
import userRouter from "./src/routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRouter)

export { app }