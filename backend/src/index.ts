import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Decoded API is running" })
})

app.listen(PORT, () => {
    console.log(`🚀 Decoded API running on port ${PORT}`)
})