import { act, renderHook } from '@testing-library/react';
import { EventBus } from '../utils/eventBus';
import { useCartStore } from './cartStore';

// Mock EventBus
jest.mock('../utils/eventBus', () => ({
  EventBus: {
    emit: jest.fn(),
  },
}));

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 100,
  image: 'https://test.com/image.jpg',
  category: 'Test',
  description: 'Test description',
};

describe('cartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
    jest.clearAllMocks();
  });

  it('should start with empty cart', () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.items).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      ...mockProduct,
      quantity: 1,
    });
    expect(result.current.getTotalItems()).toBe(1);
  });

  it('should add item with custom quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.getTotalItems()).toBe(3);
  });

  it('should increment quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 2);
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.getTotalItems()).toBe(3);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getTotalItems()).toBe(5);
  });

  it('should remove item when quantity is 0 or less', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity('1', 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCartStore());

    const product2 = { ...mockProduct, id: '2', price: 50 };

    act(() => {
      result.current.addItem(mockProduct, 2); // 100 * 2 = 200
      result.current.addItem(product2, 3); // 50 * 3 = 150
    });

    expect(result.current.getTotalPrice()).toBe(350);
  });

  it('should clear all items from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem({ ...mockProduct, id: '2' });
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('should emit cart:updated event when adding item', async () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
    });

    // Wait for setTimeout in addItem
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(EventBus.emit).toHaveBeenCalledWith('cart:updated', {
      itemCount: 1,
      totalPrice: 100,
    });
  });

  it('should emit cart:updated event when removing item', async () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
    });

    jest.clearAllMocks();

    act(() => {
      result.current.removeItem('1');
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(EventBus.emit).toHaveBeenCalledWith('cart:updated', {
      itemCount: 0,
      totalPrice: 0,
    });
  });

  it('should emit cart:updated event when clearing cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct);
      result.current.clearCart();
    });

    expect(EventBus.emit).toHaveBeenCalledWith('cart:updated', {
      itemCount: 0,
      totalPrice: 0,
    });
  });
});
