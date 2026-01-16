import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((table) => `linktree_${table}`);
