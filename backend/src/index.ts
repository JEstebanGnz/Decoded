import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import partnerRoutes from "./routes/partnerRoutes"
import cycleEntryRoutes from "./routes/cycleEntryRoutes"
import recommendationRoutes from "./routes/recommendationRoutes"
import userRoutes from "./routes/userRoutes"
import { authenticate } from "./middlewares/authenticate";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
    origin: "http://localhost:3000",
     credentials: true,
}))

app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Decoded API is running" })
})

app.use("/api/partners", authenticate, partnerRoutes)
app.use("/api/cycles", authenticate, cycleEntryRoutes)
app.use("/api/recommendations", authenticate, recommendationRoutes)
app.use("/api/users", authenticate, userRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Decoded API running on port ${PORT}`)
})