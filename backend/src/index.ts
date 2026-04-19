import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import partnerRoutes from "./routes/partnerRoutes"
import cycleEntryRoutes from "./routes/cycleEntryRoutes"
import recommendationRoutes from "./routes/recommendationRoutes"

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

app.use("/api/partners", partnerRoutes)
app.use("/api/cycles", cycleEntryRoutes)
app.use("/api/recommendations", recommendationRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Decoded API running on port ${PORT}`)
})