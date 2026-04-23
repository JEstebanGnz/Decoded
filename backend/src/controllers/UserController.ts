import { Request, Response } from "express";
import { User } from "@prisma/client";


interface AuthRequest extends Request {
  user?: User;
}

export class UserController {
    async getMe(req: AuthRequest, res: Response): Promise<void> {
        try {
            res.status(200).json({ user: req.user });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}