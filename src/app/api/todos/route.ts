import prisma from "@/@utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // const { userId } = req.query;

  // if (req.method === "GET") {
  //   if (typeof userId !== "string") {
  //     return res.status(400).json({ message: "Invalid userId" });
  //   }

  //   const todos = await prisma.todo.findMany({
  //     where: { userId: parseInt(userId) },
  //   });
  //   res.status(200).json(todos);
  // } else if (req.method === "POST") {
  try {
    if (req.method === "POST") {
      const { userId, title, status, createdAt } = await req.json();

      if (!userId || !title || !status) {
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }

      const newTodo = await prisma.todo.create({
        data: { userId: parseInt(userId), title, status, createdAt: createdAt },
      });
      return NextResponse.json({ newTodo });
    }
  } catch (e) {
    return NextResponse.json(
      { message: `Internal Server Error: ${e}` },
      { status: 500 }
    );
  }
}
