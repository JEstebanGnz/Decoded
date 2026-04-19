import { Request, Response } from "express";
import { RecommendationService } from "../services/RecommendationService";

const recommendationService = new RecommendationService()


export class RecommendationController {

    async getRecommendations(req: Request, res: Response): Promise<void>{
        try {
            const {partnerId} = req.params as {partnerId: string}
            const recommendations = await recommendationService.getRecommendations(partnerId)
            res.status(200).json({recommendations})
        } catch (error: any) {
            res.status(500).json({error:error.message})
        }
    }

}

