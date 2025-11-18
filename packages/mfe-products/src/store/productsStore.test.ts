import { act, renderHook } from '@testing-library/react';
import { useProductsStore } from './productsStore';

describe('productsStore', () => {
  it('should have initial products loaded', () => {
    const { result } = renderHook(() => useProductsStore());

    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useProductsStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
  });

  it('should set error state', () => {
    const { result } = renderHook(() => useProductsStore());

    act(() => {
      result.current.setError('Failed to load products');
    });

    expect(result.current.error).toBe('Failed to load products');
  });

  it('should update products', () => {
    const { result } = renderHook(() => useProductsStore());

    const newProducts = [
      {
        id: '999',
        name: 'Test Product',
        price: 100,
        image: 'https://test.com/image.jpg',
        category: 'Test',
        description: 'Test description',
      },
    ];

    act(() => {
      result.current.setProducts(newProducts);
    });

    expect(result.current.products).toEqual(newProducts);
    expect(result.current.products.length).toBe(1);
  });

  it('should have products with required fields', () => {
    const { result } = renderHook(() => useProductsStore());

    // Use initial products that are always loaded
    expect(result.current.products.length).toBeGreaterThan(0);

    const product = result.current.products[0];

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('description');
    expect(typeof product.price).toBe('number');
  });
});
