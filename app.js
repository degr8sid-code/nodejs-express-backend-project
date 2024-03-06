import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// normal JSON data
app.use(express.json({limit: "16kb"}))
// data coming from URL changes, so we want encoder for URLs too
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// for public assests
app.use(express.static("public"))
// for secure keys
app.use(cookieParser())

// routes import
import userRoute from "./src/routes/user.route.js";
// routes declaration
app.use("/api/v1/users", userRouter)

export { app }