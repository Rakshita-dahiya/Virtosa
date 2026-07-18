"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (existingUser) return existingUser;

  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    },
  });

  return newUser;
}