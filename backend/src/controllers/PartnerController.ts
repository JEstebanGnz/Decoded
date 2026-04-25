import { Request, Response } from "express"
import { PartnerService } from "../services/PartnerService"

export class PartnerController {

    private service: PartnerService

    constructor() {
        this.service = new PartnerService()
    }

    async create(req: Request, res: Response): Promise<void> {

        try {

            const { name, age, likes, dislikes, notes } = req.body

            if (!name || !age) {
                res.status(400).json({ error: "name and age are required" })
                return
            }

            const partner = await this.service.create(
                {
                    userId: req.user!.id,
                    name,
                    age,
                    likes: likes || [],
                    dislikes: dislikes || [],
                    notes
                }
            )

            res.status(201).json(partner)

        } catch (error) {
            console.error("Error creating partner:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    async getById(req: Request, res: Response): Promise<void> {

        try {
            const id = req.params.id as string
            const partner = await this.service.getById(id)
            res.status(200).json(partner)
        } catch (error) {
            res.status(500).json({ error: "Partner not found" })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id as string
        const { name, age, likes, dislikes, notes } = req.body

        const partner = await this.service.update(id, {
            name,
            age,
            likes,
            dislikes,
            notes,
        })

        res.status(200).json(partner)
    } catch (error) {
        console.error("Error updating partner:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}


}