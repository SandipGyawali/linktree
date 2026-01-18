import { Global, Module } from "@nestjs/common";
import { RpcHelperService } from "./rpc.service";

@Global()
@Module({
  providers: [RpcHelperService],
  exports: [RpcHelperService]
})
export class RpcHelperModule {}