import { INestApplication } from "@nestjs/common";

export const registerRoutes = (app: INestApplication<any>) => {
  app.use("/health", (req, res) => res.status(200).json({
    status: "ok",
    service: "gateway-service"
  }));

//   app.use("/auth");/
//   app.use("/users");
}