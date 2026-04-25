import { Router } from "express"
import { PartnerController } from "../controllers/PartnerController"

const router = Router()
const partnerController = new PartnerController()

router.post("/", (req,res) => partnerController.create(req,res))
router.get("/:id", (req,res) => partnerController.getById(req,res))
router.patch("/:id", (req,res) => partnerController.update(req,res))


export default router