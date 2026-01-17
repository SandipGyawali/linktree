import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import type { LinkCountResult, LinkSearchBody, LinkSearchResult } from "./link-search.interface";
import { TransportResult } from "@elastic/elasticsearch";

@Injectable()
export class LinkSearchService {
  index = "links";

  constructor(
    private readonly elasticSearchService: ElasticsearchService
  ) {}

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

  async search(query: string, userId: string) {
    const res = await this.elasticSearchService.search({
      index: this.index,
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query,
                fields: [""]
              }
            }
          ],
          filter: [{ term: { userId }}]
        }
      },
      sort: {
        _score: {
          order: "desc"
        }
      }
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