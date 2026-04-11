import { Request, Response } from "express"

export class PartnerController {


    async create(req: Request, res: Response): Promise<void>{
       
        try {

        const {name, age, likes, dislikes, notes} = req.body    
            
        if (!name || !age){
            res.status(400).json({error: "name and age are required"})
            return
        }

         const partner = {
                id: crypto.randomUUID(),
                userId: "mock-user-id",
                name,
                age,
                likes: likes || [],
                dislikes: dislikes || [],
                notes,
                createdAt: new Date()
        }

        res.status(201).json(partner)

        } catch (error) {
            res.status(500).json({error: "Internal server error"})
        }
    }

    async getById(req: Request, res:Response): Promise<void>{

        try {
            
             const {id} = req.params

         // Mock por ahora
            const partner = {
                id,
                userId: "mock-user-id",
                name: "Katherin",
                age: 25,
                likes: ["chocolate", "películas"],
                dislikes: ["ruido"],
                createdAt: new Date()
            }

            res.status(200).json(partner)

        } catch (error) {
            res.status(500).json({error: "Internal server error"})
        }
       

    }



}