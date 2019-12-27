export interface NewsApiNew {
  source: { id: string; name: string };
  author: string;
  title: string;
  url: string;
  publishedAt: Date;
}
