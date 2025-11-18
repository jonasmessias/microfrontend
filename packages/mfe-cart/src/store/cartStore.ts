import { create } from 'zustand';
import { CartItem } from '../types/cart';
import { CartUpdatedEvent, EventBus } from '../utils/eventBus';

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);

      let newItems: CartItem[];

      if (existing) {
        newItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }

      setTimeout(() => {
        const store = get();
        EventBus.emit<CartUpdatedEvent>('cart:updated', {
          itemCount: store.getTotalItems(),
          totalPrice: store.getTotalPrice(),
        });
      }, 0);

      return { items: newItems };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);

      setTimeout(() => {
        const store = get();
        EventBus.emit<CartUpdatedEvent>('cart:updated', {
          itemCount: store.getTotalItems(),
          totalPrice: store.getTotalPrice(),
        });
      }, 0);

      return { items: newItems };
    });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => {
      const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item));

      setTimeout(() => {
        const store = get();
        EventBus.emit<CartUpdatedEvent>('cart:updated', {
          itemCount: store.getTotalItems(),
          totalPrice: store.getTotalPrice(),
        });
      }, 0);

      return { items: newItems };
    });
  },

  clearCart: () => {
    set({ items: [] });

    EventBus.emit<CartUpdatedEvent>('cart:updated', {
      itemCount: 0,
      totalPrice: 0,
    });
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
