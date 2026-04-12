import { CycleEntry } from "@prisma/client"
import { CycleService } from "./CycleService"
import {CycleEntryRepository} from "../repositories/CycleEntryRepository"


export class CycleEntryService {

    private repository: CycleEntryRepository
    private cycleService: CycleService

    constructor(){
        this.repository = new CycleEntryRepository()
        this.cycleService = new CycleService()
    }

    async registerCycle(partnerId: string, startDate: Date, cycleLength: number = 28): Promise<CycleEntry>{

       const currentPhase  = this.cycleService.getCurrentPhase(startDate, cycleLength)

       return this.repository.create({
        partnerId,
        startDate,
        cycleLength,
        currentPhase
       })

    }

    async getCurrentStatus(partnerId: string): Promise<{
        phase: string
        description: string
        dayOfCycle: number}>{

            const entry = await this.repository.findLatestByPartnerId(partnerId)

            if (!entry){
                throw new Error (`No cycle registered yet for partner ${partnerId}`)
            }

            const phase = this.cycleService.getCurrentPhase(entry.startDate, entry.cycleLength)
            const description = this.cycleService.getPhaseDescription(entry.currentPhase)
            const dayOfCycle = this.cycleService.getDayOfCycle(entry.startDate)

            return { phase, description, dayOfCycle}

        }



}