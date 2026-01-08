import { Injectable } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async login() {}
}