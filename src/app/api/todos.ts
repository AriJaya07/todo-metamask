import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function todoGetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const todos = await prisma.todo.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}
