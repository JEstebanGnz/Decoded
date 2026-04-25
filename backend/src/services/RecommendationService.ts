import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient, Partner, CyclePhase } from "@prisma/client";

const prisma = new PrismaClient();
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export class RecommendationService {

    async getRecommendations(partnerId: string): Promise<{ title: string; description: string }[]> {
        const partner = await prisma.partner.findUnique({
            where: { id: partnerId },
        })

        if (!partner) {
            throw new Error("Partner not found");
        }

        const latestCycle = await prisma.cycleEntry.findFirst({
            where: { partnerId },
            orderBy: { startDate: "desc" }
        })

        if (!latestCycle) {
            throw new Error("No cycle data found for this partner");
        }

        const prompt = this.buildPrompt(partner, latestCycle.currentPhase)

        const message = await anthropic.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 512,
            system: "Eres un asistente empático que ayuda a las personas a conectar mejor con su pareja basándote en su ciclo menstrual y preferencias personales. Responde siempre en español, de forma cariñosa y práctica.",
            messages: [{ role: "user", content: prompt }]
        })

        const content = message.content[0]
        if (content.type != "text") {
            throw new Error("Unexpected error from Claude")
        }

        const raw = content.text.trim().replace(/```json|```/g, "").trim();

        try {
            const recommendations = JSON.parse(raw);
            return recommendations;
        } catch {
            throw new Error("Claude no retornó un JSON válido");
        }

    }

    private buildPrompt(partner: Partner, phase: CyclePhase): string {
        return `
    Esta es la información de la pareja:
    - Nombre: ${partner.name}
    - Edad: ${partner.age} años
    - Le gusta: ${partner.likes.join(", ")}
    - No le gusta: ${partner.dislikes.join(", ")}
    - Notas adicionales: ${partner.notes ?? "ninguna"}
    - Fase actual del ciclo menstrual: ${phase}
    
    Genera exactamente 2 recomendaciones concretas y cariñosas para que su pareja 
    pueda hacerla sentir bien hoy. Sé específico y práctico y a la vez habla con un lenguaje amable y comprensible, pero recuerda, sé muy conciso y no te extiendas demasiado.

   Responde ÚNICAMENTE con un JSON válido, sin texto adicional, sin backticks, sin explicaciones.
    El formato debe ser exactamente este:
    [
      { "title": "título corto", "description": "descripción detallada" },
      { "title": "título corto", "description": "descripción detallada" }
    ]
  `;
    }



}