import { CartAddItemEvent, CartUpdatedEvent, EventBus } from './eventBus';

describe('EventBus', () => {
  beforeEach(() => {
    // Clear all event listeners
    jest.clearAllMocks();
  });

  it('should emit and receive events', () => {
    const handler = jest.fn();
    const testData = { test: 'data' };

    EventBus.on('test:event', handler);
    EventBus.emit('test:event', testData);

    expect(handler).toHaveBeenCalledWith(testData);
  });

  it('should emit cart:add-item event with correct data', () => {
    const handler = jest.fn();
    const cartData: CartAddItemEvent = {
      product: {
        id: '1',
        name: 'Test Product',
        price: 100,
        image: 'https://test.com/image.jpg',
        category: 'Test',
        description: 'Test description',
      },
      quantity: 2,
    };

    EventBus.on<CartAddItemEvent>('cart:add-item', handler);
    EventBus.emit<CartAddItemEvent>('cart:add-item', cartData);

    expect(handler).toHaveBeenCalledWith(cartData);
  });

  it('should emit cart:updated event with correct data', () => {
    const handler = jest.fn();
    const updateData: CartUpdatedEvent = {
      itemCount: 5,
      totalPrice: 500,
    };

    EventBus.on<CartUpdatedEvent>('cart:updated', handler);
    EventBus.emit<CartUpdatedEvent>('cart:updated', updateData);

    expect(handler).toHaveBeenCalledWith(updateData);
  });

  it('should return cleanup function that removes listener', () => {
    const handler = jest.fn();

    const cleanup = EventBus.on('test:event', handler);

    EventBus.emit('test:event', { test: 'data' });
    expect(handler).toHaveBeenCalledTimes(1);

    cleanup();

    EventBus.emit('test:event', { test: 'data' });
    expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should support multiple listeners for same event', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    EventBus.on('test:event', handler1);
    EventBus.on('test:event', handler2);

    EventBus.emit('test:event', { test: 'data' });

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  it('should not affect other events when cleaning up', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    const cleanup1 = EventBus.on('event1', handler1);
    EventBus.on('event2', handler2);

    cleanup1();

    EventBus.emit('event1', { test: 'data1' });
    EventBus.emit('event2', { test: 'data2' });

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
});
