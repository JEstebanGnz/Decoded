import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET!
    ) as { sub: string; email: string; name: string };

    const user = await prisma.user.upsert({
      where: { googleId: decoded.sub },
      update: {},
      create: {
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
      },
    });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}