import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";


interface AuthRequest extends Request {
    user?: User;
}


const prisma = new PrismaClient()

export class UserController {

    async getMe(req: Request, res: Response): Promise<void> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.user!.id },
                include: { 
                    partners: {
                        include: {
                            cycleEntries: {
                                orderBy: {startDate: "desc"},
                                take:1
                            }
                        }
                    }
                },
            });

            res.status(200).json({ user });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}