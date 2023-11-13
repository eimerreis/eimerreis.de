export interface NotionPage {
  id: string;
  title: string;
  content: NotionBlock[];
}

export interface NotionBlock {
  type: string;
  text: string; // Simplified for demonstration; adjust as needed for different block types
}