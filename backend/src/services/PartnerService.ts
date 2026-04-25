import { Partner } from "@prisma/client"
import { PartnerRepository } from "../repositories/PartnerRepository"

export class PartnerService {

    private repository: PartnerRepository

    constructor() {
        this.repository = new PartnerRepository()
    }

    async create(data: Omit<Partner, "id" | "createdAt">): Promise<Partner> {
        return this.repository.create(data)
    }

    async getById(id: string): Promise<Partner> {

        const partner = await this.repository.findById(id)
        if (!partner) {
            throw new Error(`Partner with id ${id} not found`)
        }
        return partner
    }

    async getByUserId(userId: string): Promise<Partner> {
        const partner = await this.repository.findByUserId(userId)

        if (!partner) {
            throw new Error(`No partner found for user ${userId}`)
        }

        return partner
    }

    async update(id: string, data: Partial<Omit<Partner, "id" | "createdAt">>): Promise<Partner> {
        const existing = await this.repository.findById(id)
        if (!existing) {
            throw new Error(`Partner with id ${id} not found`)
        }
        return this.repository.update(id, data)
    }


}