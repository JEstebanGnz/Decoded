import { Router } from "express"
import { CycleEntryController } from "../controllers/CycleEntryController"

const router = Router()
const cycleEntryController = new CycleEntryController()

router.post("/", (req, res) => cycleEntryController.register(req, res))
router.get("/:partnerId/status", (req, res) => cycleEntryController.getCurrentStatus(req, res))
router.get("/:partnerId/history", (req, res) => cycleEntryController.getAll(req, res))
router.delete("/:id", (req, res) => cycleEntryController.delete(req, res))


export default router