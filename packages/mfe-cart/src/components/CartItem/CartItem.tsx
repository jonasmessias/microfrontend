import { CartItem as CartItemType } from '../../types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="p-4 flex gap-4">
      {/* Image - Amazon style */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-contain bg-gray-50 rounded"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-microshop-link-hover cursor-pointer">
          {item.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xs text-gray-700">R$</span>
          <span className="text-lg font-bold text-gray-900">{Math.floor(item.price)}</span>
          <span className="text-xs text-gray-700">{(item.price % 1).toFixed(2).slice(1)}</span>
        </div>

        {/* Stock status */}
        <p className="text-xs text-green-700 font-medium mb-2">Em estoque</p>

        {/* Shipping */}
        <p className="text-xs text-gray-700 mb-3">
          <span className="font-bold">Frete GRÁTIS</span>
        </p>

        <div className="flex items-center gap-4">
          <select
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
            className="text-xs border border-gray-300 rounded px-2 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-microshop-orange-focus focus:border-microshop-orange-focus"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Qtd: {i + 1}
              </option>
            ))}
          </select>

          <span className="text-gray-300">|</span>

          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-microshop-link hover:text-microshop-link-hover hover:underline"
          >
            Excluir
          </button>

          <span className="text-gray-300">|</span>

          <button className="text-xs text-microshop-link hover:text-microshop-link-hover hover:underline">
            Salvar para depois
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right flex-shrink-0">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-gray-700">R$</span>
          <span className="text-lg font-bold text-gray-900">
            {Math.floor(item.price * item.quantity)}
          </span>
          <span className="text-xs text-gray-700">
            {((item.price * item.quantity) % 1).toFixed(2).slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
