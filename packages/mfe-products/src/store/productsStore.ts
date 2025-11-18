import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Notebook Gamer',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      category: 'Eletrônicos',
      description: 'Notebook gamer de alta performance',
    },
    {
      id: '2',
      name: 'Mouse Gamer RGB',
      price: 150,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      category: 'Periféricos',
      description: 'Mouse com iluminação RGB',
    },
    {
      id: '3',
      name: 'Teclado Mecânico',
      price: 350,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      category: 'Periféricos',
      description: 'Teclado mecânico switches blue',
    },
    {
      id: '4',
      name: 'Monitor 27"',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
      category: 'Eletrônicos',
      description: 'Monitor Full HD 144Hz',
    },
    {
      id: '5',
      name: 'Headset Gamer',
      price: 300,
      image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400',
      category: 'Periféricos',
      description: 'Headset com som surround 7.1',
    },
    {
      id: '6',
      name: 'Webcam HD',
      price: 250,
      image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400',
      category: 'Eletrônicos',
      description: 'Webcam 1080p 60fps',
    },
  ],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
