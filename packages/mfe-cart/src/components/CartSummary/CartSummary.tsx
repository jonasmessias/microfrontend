interface CartSummaryProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
  onClear: () => void;
}

export function CartSummary({ itemCount, totalPrice, onCheckout, onClear }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Subtotal - Amazon style */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg text-gray-900">Subtotal</span>
          <span className="text-sm text-gray-700">
            ({itemCount} {itemCount === 1 ? 'item' : 'itens'}):
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-gray-700">R$</span>
          <span className="text-2xl font-bold text-gray-900">{Math.floor(totalPrice)}</span>
          <span className="text-sm text-gray-700">{(totalPrice % 1).toFixed(2).slice(1)}</span>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-2">
        <input
          type="checkbox"
          id="gift"
          className="mt-1 w-4 h-4 text-microshop-link border-gray-300 rounded focus:ring-microshop-link"
        />
        <label htmlFor="gift" className="text-xs text-gray-900 cursor-pointer">
          Este pedido é um presente
        </label>
      </div>

      <button
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="w-full bg-microshop-yellow-bright hover:bg-microshop-yellow-bright-hover text-gray-900 text-sm font-medium py-2 px-4 rounded-lg border border-microshop-yellow-bright-border shadow-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:bg-microshop-yellow-bright-active mb-2"
      >
        Fechar pedido
      </button>

      {/* Clear Cart */}
      {itemCount > 0 && (
        <button
          onClick={onClear}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 text-xs py-2 px-4 rounded-lg border border-gray-300 shadow-sm transition-colors duration-150"
        >
          Limpar carrinho
        </button>
      )}

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <div className="flex justify-between text-xs text-gray-700">
          <span>Itens:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Frete e manuseio:</span>
          <span className="text-green-700 font-bold">GRÁTIS</span>
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Total antes dos impostos:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-700">
          <span>Imposto estimado:</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-microshop-link-hover pt-2 border-t border-gray-200">
          <span>Total do pedido:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
