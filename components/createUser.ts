// import { prisma } from "@/lib/prisma";
// import type { User } from "@clerk/nextjs/server";

// export const createUser = async (user: User) => {
//     try {
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 id: user.id,
//             },
//         });

//         if (!existingUser) {
//             await prisma.user.create({
//                 data: {
//                     id: user.id,
//                     email: user.emailAddresses[0].emailAddress,
//                     name: `${user.firstName ?? ""} ${
//                         user.lastName ?? ""
//                     }`.trim(),
//                 },
//             });
//         }

//         return { success: true, error: false };
//     } catch (error) {
//         console.error("Error creating user:", error);
//         return { success: false, error: true };
//     }
// };
