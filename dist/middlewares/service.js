"use strict";
// import dbClient from "../utils/dbClient";
// import { User } from "@prisma/client";
// import { compare } from "bcrypt";
// export const findUserWithValidation = async (userData: User) => {
//   const foundUser = await dbClient.user.findUnique({
//     where: { userName: userData.userName },
//   });
//   if (!foundUser) throw new Error("Username/Password incorrect");
//   const isPasswordValid = await compare(userData.password, foundUser.password);
//   if (!isPasswordValid) throw new Error("Username/Password incorrect");
//   return foundUser;
// };
