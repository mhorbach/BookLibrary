export interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string | null;
  imageName: string | null;
  description: string | undefined;
  publicationDate: string;
}
