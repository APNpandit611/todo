// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => new PrismaClient();

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;


import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;