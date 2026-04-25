import { CycleEntry } from "@prisma/client"
import { CycleService } from "./CycleService"
import { CycleEntryRepository } from "../repositories/CycleEntryRepository"
import { PartnerRepository } from "../repositories/PartnerRepository"

export class CycleEntryService {
    private repository: CycleEntryRepository
    private cycleService: CycleService
    private partnerRepository: PartnerRepository

    constructor() {
        this.repository = new CycleEntryRepository()
        this.cycleService = new CycleService()
        this.partnerRepository = new PartnerRepository()
    }

    async registerCycle(partnerId: string, userId: string, startDate: Date, cycleLength: number = 28): Promise<CycleEntry> {
        const partner = await this.partnerRepository.findByIdAndUserId(partnerId, userId)
        if (!partner) throw new Error("FORBIDDEN")
        const currentPhase = this.cycleService.getCurrentPhase(startDate, cycleLength)
        return this.repository.create({ partnerId, startDate, cycleLength, currentPhase })
    }

    async getCurrentStatus(partnerId: string): Promise<{ phase: string; description: string; dayOfCycle: number }> {
        const entry = await this.repository.findLatestByPartnerId(partnerId)
        if (!entry) throw new Error(`No cycle registered yet for partner ${partnerId}`)
        const phase = this.cycleService.getCurrentPhase(entry.startDate, entry.cycleLength)
        const description = this.cycleService.getPhaseDescription(entry.currentPhase)
        const dayOfCycle = this.cycleService.getDayOfCycle(entry.startDate)
        
        console.log(dayOfCycle)
        return { phase, description, dayOfCycle }
    }

    async getAllByPartnerId(partnerId: string, userId: string): Promise<CycleEntry[]> {
        const partner = await this.partnerRepository.findByIdAndUserId(partnerId, userId)
        if (!partner) throw new Error("FORBIDDEN")
        return this.repository.findAllByPartnerId(partnerId)
    }

    async deleteById(id: string, userId: string): Promise<void> {
        const entry = await this.repository.findById(id)
        if (!entry) throw new Error("NOT_FOUND")
        const partner = await this.partnerRepository.findByIdAndUserId(entry.partnerId, userId)
        if (!partner) throw new Error("FORBIDDEN")
        await this.repository.deleteById(id)
    }
}