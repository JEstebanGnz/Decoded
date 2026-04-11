import prisma from "../lib/prisma"
import { Partner } from "@prisma/client"

export class PartnerRepository {

    async findById(id: string): Promise <Partner | null> {
        return prisma.partner.findUnique({
            where: {id}
        })
    }

    async findByUserId(userId: string): Promise <Partner | null>{
        return prisma.partner.findFirst({
            where:{userId}
        })
    }

    async create (data: Omit<Partner, "id" | "createdAt">): Promise <Partner> {
        return prisma.partner.create({data})
    }

    async update(id: string, data: Partial<Partner>): Promise <Partner> {
        return prisma.partner.update({
            where: {id},
            data
        })
    }



}