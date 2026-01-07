import { INestApplication } from "@nestjs/common";
import { authRouter } from "./auth.routes";

export const registerRoutes = (app: INestApplication<any>) => {
  app.use("/health", (req, res) => res.status(200).json({
    status: "ok",
    service: "gateway-service"
  }));

  app.use("/auth", authRouter);
//   app.use("/users");
}