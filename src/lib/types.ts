// import { Prisma } from "@prisma/client";


// export const userDataSelect={
//     id:true,
//     displayname: true,
//     avatarUrl: true,
//   } satisfies Prisma.UserSelect
// export const postDataincludes = {
//     user: {
//       select: userDataSelect
//     },
//   } satisfies Prisma.PostInclude;
  
//   export type PostData = Prisma.PostGetPayload<{
//     include: typeof postDataincludes;
//   }>;