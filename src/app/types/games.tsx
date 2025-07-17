export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
  isBestSeller?: boolean;
  isPromo?: boolean;
  isUnderTen?: boolean;
}
