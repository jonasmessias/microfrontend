import { useEffect } from 'react';
import { CartItem } from './components/CartItem';
import { CartSummary } from './components/CartSummary';
import { useCartStore } from './store/cartStore';
import { CartAddItemEvent, EventBus } from './utils/eventBus';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    const unsubscribe = EventBus.on<CartAddItemEvent>('cart:add-item', (data) => {
      addItem(data.product, data.quantity);
    });

    return unsubscribe;
  }, [addItem]);

  const handleCheckout = () => {
    alert(
      `🎉 Compra finalizada!\n\nTotal: R$ ${getTotalPrice().toFixed(2)}\nItens: ${getTotalItems()}`
    );
    clearCart();
  };

  return (
    <div className="space-y-4">
      {/* Cart Header - Amazon style */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Carrinho de compras</h2>
        <p className="text-sm text-gray-600">
          {items.length > 0
            ? `${getTotalItems()} ${getTotalItems() === 1 ? 'item' : 'itens'}`
            : 'Vazio'}
        </p>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Seu carrinho está vazio</h3>
          <p className="text-gray-600 mb-4">Adicione produtos para começar</p>
        </div>
      ) : (
        <>
          {/* Cart Items - Amazon style */}
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <CartSummary
            itemCount={getTotalItems()}
            totalPrice={getTotalPrice()}
            onCheckout={handleCheckout}
            onClear={clearCart}
          />
        </>
      )}
    </div>
  );
}
