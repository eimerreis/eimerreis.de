import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

export type NotionPageRecord = PageObjectResponse | PartialPageObjectResponse;
export type NotionBlockRecord = BlockObjectResponse | PartialBlockObjectResponse;
export type QueryResult = QueryDatabaseResponse['results'][number];

export type RichTextSpan = {
  plainText: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

export type NotionBlockNode = {
  id: string;
  type: string;
  hasChildren: boolean;
  children: NotionBlockNode[];
  richText?: RichTextSpan[];
  url?: string;
  caption?: RichTextSpan[];
  language?: string;
  icon?: string;
};

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  topics: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type PostDetail = PostSummary & {
  blocks: NotionBlockNode[];
};

export type PageEntry = {
  id: string;
  title: string;
  slug: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  blocks: NotionBlockNode[];
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  href: string;
  image: string | null;
  totalTracks: number;
};
