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
            const entry = await this.service.registerCycle(
                partnerId,
                req.user!.id,
                new Date(startDate),
                cycleLength
            )
            res.status(201).json(entry)
        } catch (error) {
            if (error instanceof Error && error.message === "FORBIDDEN") {
                res.status(403).json({ error: "No tienes permiso para modificar este partner" })
                return
            }
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

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const partnerId = req.params.partnerId as string
            const entries = await this.service.getAllByPartnerId(partnerId, req.user!.id)
            res.status(200).json({ entries })
        } catch (error) {
            if (error instanceof Error && error.message === "FORBIDDEN") {
                res.status(403).json({ error: "No tienes permiso para ver estos ciclos" })
                return
            }
            res.status(500).json({ error: "Internal server error" })
        }
    }

      async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string
            await this.service.deleteById(id, req.user!.id)
            res.status(204).send()
        } catch (error) {
            if (error instanceof Error && error.message === "FORBIDDEN") {
                res.status(403).json({ error: "No tienes permiso para eliminar este ciclo" })
                return
            }
            if (error instanceof Error && error.message === "NOT_FOUND") {
                res.status(404).json({ error: "Ciclo no encontrado" })
                return
            }
            res.status(500).json({ error: "Internal server error" })
        }
    }

    
}