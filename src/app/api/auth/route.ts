import prisma from "@/@utils/prisma";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { address, signature } = await req.json();

      // Verify the signature and get the address
      const verivyAddress = ethers.utils.verifyMessage(address, signature);

      // Find the user by address
      let user = await prisma.user.findUnique({
        where: { address: verivyAddress },
      });

      // If the user doesn't exist, create a new one
      if (!user) {
        user = await prisma.user.create({
          data: { address: verivyAddress },
        });
      }

      // Return the user data
      return NextResponse.json({ user });
    } catch (error) {
      console.error("Error in authentication handler:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
