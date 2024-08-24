import prisma from "@/@utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const url = new URL(req.url);
      const userId = url.searchParams.get("userId");

      if (!userId || isNaN(Number(userId))) {
        return NextResponse.json({ message: "Invalid userId", status: 400 });
      }

      const todos = await prisma.todo.findMany({
        where: { userId: parseInt(userId) },
      });
      return NextResponse.json({ todos });
    } catch (e) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
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
    } catch (e) {
      return NextResponse.json(
        { message: `Internal Server Error: ${e}` },
        { status: 500 }
      );
    }
  }
}

export async function PUT(req: Request) {
  if (req.method === "PUT") {
    try {
      const { id, status } = await req.json();

      if (!id || !status || typeof status !== "string") {
        return NextResponse.json(
          { message: "Invalid input data" },
          { status: 400 }
        );
      }

      const updatedTodo = await prisma.todo.updateMany({
        where: {
          id: parseInt(id),
        },
        data: {
          status,
        },
      });

      return NextResponse.json({ updatedTodo });
    } catch (e) {
      return NextResponse.json(
        { message: `Internal Server Error: ${e}` },
        { status: 500 }
      );
    }
  }
}
