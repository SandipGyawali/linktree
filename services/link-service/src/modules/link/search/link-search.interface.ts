export interface LinkSearchBody {
  linkId: string,
  slug: string,
  userId: string,
  originalUrl: string,
  title: string | null;
}

export interface LinkSearchResult {
  hits: {
    total: {
      value: number;
    };
    hits: Array<{
      _source: LinkSearchBody;
    }>;
  };
}


export interface LinkCountResult {
  count: number;
}
