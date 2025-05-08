import { InitialType, user } from "../types";

export const isManager = (managerId: InitialType["manager"], userId: user["_id"]) => managerId === userId;