export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
  style: string[];
  store: string;
  url: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  style: string;
  description: string;
  imageUrl: string;
}

export interface Style {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

export interface Store {
  id: string;
  name: string;
  type: 'major' | 'local';
  website: string;
  location?: string;
} 