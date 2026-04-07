export type ArtikelType = "achievement" | "news";

export interface Artikel {
  id: number;
  image: string | { url: string };
  description: string;
  title: string;
  category: ArtikelType;
  readMoreLink?: string;
}

export interface ArtikelResponse {
  data: Artikel[];
}

export interface Tag {
  tag: string;
}

export interface DetailArtikel {
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  image: string;
  description: string;
  tags: Tag[];
}

export interface DetailArtikelResponse {
  data: DetailArtikel;
}
