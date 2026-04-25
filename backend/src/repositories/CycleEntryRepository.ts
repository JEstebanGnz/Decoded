import prisma from "../lib/prisma"
import { CycleEntry, CyclePhase } from "@prisma/client"


export class CycleEntryRepository {

    async create(data: Omit<CycleEntry, "id" | "createdAt">): Promise<CycleEntry> {
        return prisma.cycleEntry.create({ data })
    }

        async findById(id: string): Promise<CycleEntry | null> {
        return prisma.cycleEntry.findUnique({ where: { id } })
    }

    async findLatestByPartnerId(partnerId: string): Promise<CycleEntry | null> {
        return prisma.cycleEntry.findFirst({
            where: { partnerId },
            orderBy: { startDate: "desc" }
        })
    }

    

    async updatePhase(id: string, phase: CyclePhase): Promise<CycleEntry> {
        return prisma.cycleEntry.update({
            where: { id },
            data: { currentPhase: phase }
        })
    }

    async findAllByPartnerId(partnerId: string): Promise<CycleEntry[]> {
        return prisma.cycleEntry.findMany({
            where: { partnerId },
            orderBy: { startDate: "desc" },
        })

    }

    async deleteById(id: string): Promise<void> {
        await prisma.cycleEntry.delete({ where: { id } })
    }

}