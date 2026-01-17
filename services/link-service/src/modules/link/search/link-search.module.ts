import { Module } from "@nestjs/common";
import { LinkSearchService } from "./link-search.service";
import { ElasticSearchModule } from "src/modules/elasticsearch/elasticsearch.module";

@Module({
  imports: [ElasticSearchModule],
  providers: [LinkSearchService],
  exports: [LinkSearchService], 
})
export class LinkSearchModule {}
