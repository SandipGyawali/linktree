import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import type { LinkSearchBody } from "./link-search.interface";
import { OnModuleInit } from "@nestjs/common";

@Injectable()
export class LinkSearchService implements OnModuleInit{
  index = "links";

  constructor(
    private readonly elasticSearchService: ElasticsearchService
  ) {}

  async onModuleInit() {
    this.ensureIndexExists();
  }

  private async ensureIndexExists() {
    const exists =  await this.elasticSearchService.indices.exists({ index: "links" });

    if(!exists) {
      await this.elasticSearchService.indices.create({
        index: "links",
        mappings: {
          properties: {
            title: { type: "text" },
            slug: { type: "keyword" },
            originalUrl: { type: "text" },
            userId: { type: "keyword" },
          }
        }
      });
      console.log(`Elasticsearch index "links" created!`)
    }
  }

  async indexLink(
    doc: LinkSearchBody
  ): Promise<{ _id: string; result: string }> {
    const response = await this.elasticSearchService.index({
      index: this.index,
      id: doc.linkId,
      document: doc,
    });

    return {
      _id: response._id,
      result: response.result
    };
  }

  async search(query: string, userId: string, from = 0, size = 20) {
    const must: any[] = [];
    if(query.trim()) {
      must.push({
        multi_match: {
          query,
          fields: ["title^3", "slug^2", "originalUrl"],
          fuzziness: "AUTO",
        }
      });
    }

    console.log(must)

    const res = await this.elasticSearchService.search({
      index: this.index,
      from,
      size, 
      query: {
        bool: {
          must,
          filter: [{ term: { userId }}]
        }
      },
      sort: {
        _score: {
          order: "desc"
        }
      },
    });

    return res.hits.hits.map(hit => hit._source!);
  }

  async updateLink(doc: LinkSearchBody) {
    this.elasticSearchService.update({
      index: this.index,
      id: doc.linkId,
      doc,
      doc_as_upsert: true // create if missing
    });
  }

  async removeLink(linkId: string) {
    this.elasticSearchService.delete({
      index: this.index,
      id: linkId,
    });
  }
}