import { Router } from "express";
import { RecommendationController } from "../controllers/RecommendationController";


const router = Router();
const recommendationController = new RecommendationController();

router.get("/:partnerId", (req, res) => {
  recommendationController.getRecommendations(req, res);
});

export default router;