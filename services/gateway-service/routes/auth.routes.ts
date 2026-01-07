import { Router } from "express";


export const authRouter: Router = Router();

authRouter.post("/register", () => {});
authRouter.post("/login", () => {})
authRouter.post("/refresh", () => {})
authRouter.post("/revoke", () => {})
