import prisma from "../lib/prisma"
import {CycleEntry, CyclePhase} from "@prisma/client"


export class CycleEntryRepository{



    async create(data: Omit<CycleEntry, "id" | "createdAt">): Promise<CycleEntry> {
        return prisma.cycleEntry.create({data})
    }

    async findLatestByPartnerId (partnerId: string): Promise<CycleEntry | null> {
        return prisma.cycleEntry.findFirst({
            where: {partnerId},
            orderBy: {startDate: "desc"}
        })
    }

    async updatePhase(id: string, phase: CyclePhase): Promise<CycleEntry> {
        return prisma.cycleEntry.update({
            where: {id},
            data : {currentPhase: phase}
        })
    }





}