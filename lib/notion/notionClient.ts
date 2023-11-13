import { Client as NotionClient } from "@notionhq/client";

export const notionClient = new NotionClient({ auth: process.env.NOTION_API_KEY });