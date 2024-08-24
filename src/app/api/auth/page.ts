import prisma from "@/@utils/prisma";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

export default async function Page(req: Request) {
  console.log("PPPP")
  if (req.method === "POST") {
    try {
      const { address, signature } = await req.json();

      // Verify the signature and get the address
      const verivyAddress = ethers.utils.verifyMessage(address, signature);
      console.log(verivyAddress, "verivy")

      // Find the user by address
      let user = await prisma.user.findUnique({
        where: { address: verivyAddress },
      });
      console.log(user, "user1")

      // If the user doesn't exist, create a new one
      if (!user) {
        user = await prisma.user.create({
          data: { address: verivyAddress },
        });
      }

      console.log("user", user)

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

