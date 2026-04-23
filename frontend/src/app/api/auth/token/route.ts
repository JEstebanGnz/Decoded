import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      sub: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token });
}