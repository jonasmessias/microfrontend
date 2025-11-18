/**
 * EventBus - Communication between Microfrontends via Custom Events
 *
 * Usage:
 * - EventBus.emit('event', { data })
 * - EventBus.on('event', (data) => { ... })
 */

export const EventBus = {
  /**
   * Emits a custom event
   */
  emit<T>(eventName: string, detail: T): void {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
    console.log(`[EventBus] Emitted: ${eventName}`, detail);
  },

  /**
   * Listens to a custom event
   * @returns Cleanup function to remove the listener
   */
  on<T>(eventName: string, handler: (detail: T) => void): () => void {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<T>;
      console.log(`[EventBus] Received: ${eventName}`, customEvent.detail);
      handler(customEvent.detail);
    };

    window.addEventListener(eventName, listener);

    // Returns cleanup function
    return () => window.removeEventListener(eventName, listener);
  },
};

// Event types used in the application
export interface CartAddItemEvent {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
  quantity: number;
}

export interface CartUpdatedEvent {
  itemCount: number;
  totalPrice: number;
}
