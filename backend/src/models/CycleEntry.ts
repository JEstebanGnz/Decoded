export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal"

export interface CycleEntry {
    id: string         
    partnerId: string   
    startDate: Date
    cycleLength: number
    currentPhase: CyclePhase
    createdAt: Date
}