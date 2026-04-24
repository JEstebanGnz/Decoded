import { CycleEntryService } from "../services/CycleEntryService"
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class CycleEntryController {

    private service: CycleEntryService

    constructor() {
        this.service = new CycleEntryService()
    }

    async register(req: Request, res: Response): Promise<void> {

        try {

            const { partnerId, startDate, cycleLength } = req.body

            if (!partnerId || !startDate) {
                res.status(400).json({ error: "partnerId and startDate are required" })
                return
            }

            // Verificar que el partner pertenece al usuario autenticado
            const partner = await prisma.partner.findFirst({
                where: {
                    id: partnerId,
                    userId: req.user!.id,
                },
            });

            if (!partner) {
                res.status(403).json({ error: "No tienes permiso para modificar este partner" });
                return;
            }

            const entry = await this.service.registerCycle(
                partnerId,
                new Date(startDate),
                cycleLength
            )

            res.status(201).json(entry)

        } catch (error) {
            console.error("Error registering cycle:", error)
            res.status(500).json({ error: "Internal server error" })
        }

    }

    async getCurrentStatus(req: Request, res: Response): Promise<void> {
        try {
            const partnerId = req.params.partnerId as string
            const status = await this.service.getCurrentStatus(partnerId)
            res.status(200).json(status)

        } catch (error) {
            console.error("Error getting cycle status:", error)
            res.status(404).json({ error: "No cycle found for this partner" })
        }
    }
}