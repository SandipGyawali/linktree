import { Global, Module } from "@nestjs/common"
import { ElasticsearchModule as _ElasticSearchModule } from "@nestjs/elasticsearch";
import { ENV } from "src/config/env";

@Global()
@Module({
  imports: [
    _ElasticSearchModule.register({
      node: ENV.ELASTICSEARCH_NODE || "http://localhost:9200",
      maxRetries: 5,
      sniffOnStart: true,
    })
  ],
  exports: [_ElasticSearchModule]
})
export class ElasticSearchModule {}