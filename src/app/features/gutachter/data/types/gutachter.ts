export interface Gutachter {
  id: number;
  name?: string;
  address?: string;
  imageUrl?: string;
  description?: string;
  starRating: number;
  tags?: string[];
}
