import prisma from "@/@utils/prisma";

export default async function todosHandler(req: any, res: any) {
  const { userId } = req.query;

  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { title, userId } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title, userId: parseInt(userId) },
    });
    res.status(201).json(newTodo);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
