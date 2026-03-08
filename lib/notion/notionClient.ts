import 'server-only';

import { Client as NotionClient } from '@notionhq/client';

const notionApiKey = process.env.NOTION_API_KEY;

export const notionClient = notionApiKey
  ? new NotionClient({ auth: notionApiKey })
  : null;

export const hasNotion = Boolean(notionClient);
