import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const ROLES = (...roles: any[]) => SetMetadata(ROLES_KEY, {})