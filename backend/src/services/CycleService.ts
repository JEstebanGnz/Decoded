import {CyclePhase} from "@prisma/client"

export class CycleService{


    getCurrentPhase (startDate: Date, cycleLength: number = 28): CyclePhase {

        const today = new Date()
        const diffTime = today.getTime() - startDate.getTime()
        const dayOfCycle = Math.floor(diffTime / (1000 * 60 * 60 *24)) + 1

        if (dayOfCycle <= 5) return "menstrual"
        if (dayOfCycle <= 13) return "follicular"
        if (dayOfCycle <= 16) return "ovulation"
        return "luteal"

    }

    getDayOfCycle(startDate: Date): number {
    return Math.floor(
        (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1
}

    getPhaseDescription (phase: CyclePhase): string {
        const descriptions: Record<CyclePhase, string> = {
            menstrual: "She may need rest and comfort. Be extra caring and patient.",
            follicular: "Her energy is rising. Great time for plans and activities together.",
            ovulation: "She's at peak energy and sociability. Perfect for dates and quality time.",
            luteal: "She may feel more sensitive. Be calm, understanding and supportive."
        }

        return descriptions[phase]
    }



}