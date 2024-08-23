import prisma from "@/@utils/prisma";
import { ethers } from "ethers";

export default async function AuthHandler(req: any, res: any) {
  if (req.method === "POST") {
    const { message, signature } = req.body;

    const address = ethers.utils.verifyMessage(message, signature);

    let user = await prisma.user.findUnique({
      where: { address },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { address },
      });
    }

    res.status(200).json({ user });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
