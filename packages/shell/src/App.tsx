import { lazy, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';

// @ts-ignore - Module Federation dynamic import
const Products = lazy(() => import('mfeProducts/Products'));

// @ts-ignore - Module Federation dynamic import
const Cart = lazy(() => import('mfeCart/Cart'));

// @ts-ignore - Module Federation dynamic import to access cart store
const getCartStore = async () => {
  try {
    const { useCartStore } = await import('mfeCart/cartStore');
    return useCartStore;
  } catch {
    return null;
  }
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;

    if (searchTerm?.trim()) {
      // Emitir evento de busca para o MFE de produtos
      const searchEvent = new CustomEvent('product:search', {
        detail: { searchTerm: searchTerm.trim(), category: selectedCategory },
      });
      window.dispatchEvent(searchEvent);
      setIsSearchActive(true);
      setActiveSearchTerm(searchTerm.trim());
      console.log('🔍 Buscando:', searchTerm, 'em', selectedCategory);
    }
  };

  const clearSearch = () => {
    setSelectedCategory('Todos');
    setIsSearchActive(false);
    setActiveSearchTerm('');
    const searchInput = document.querySelector('input[name="search"]') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    const clearEvent = new CustomEvent('product:search:clear');
    window.dispatchEvent(clearEvent);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    getCartStore().then((useCartStore) => {
      if (useCartStore) {
        const updateCount = () => {
          const items = useCartStore.getState().items;
          const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
          setCartItemCount(totalItems);
        };

        updateCount();
        unsubscribe = useCartStore.subscribe(updateCount);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-microshop-dark text-white shadow-md h-[140px] flex flex-col">
        <div className="flex-1 flex items-center justify-between px-4 max-w-[1500px] w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
              <span className="text-2xl font-bold">🏪</span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-300">Bem-vindo ao</span>
                <span className="text-sm font-bold">MicroShop</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-4">
            <div className="flex">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l border-r-2 border-gray-300 text-sm font-medium cursor-pointer hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-microshop-orange focus:ring-offset-2 focus:ring-offset-microshop-dark"
              >
                <option>Todos</option>
                <option>Eletrônicos</option>
                <option>Livros</option>
                <option>Roupas</option>
                <option>Casa</option>
                <option>Esportes</option>
              </select>
              <input
                type="text"
                name="search"
                placeholder="Buscar produtos"
                className="flex-1 px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-microshop-orange"
              />
              <button
                type="submit"
                className="bg-microshop-yellow hover:bg-microshop-yellow-hover px-4 py-2 rounded-r transition-colors focus:outline-none focus:ring-2 focus:ring-microshop-orange"
                aria-label="Buscar"
              >
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Badge de busca ativa */}
            {isSearchActive && (
              <div className="mt-2 flex items-center gap-2 text-white">
                <span className="text-xs">
                  🔍 <span className="font-semibold">{activeSearchTerm}</span>
                  {selectedCategory !== 'Todos' && (
                    <span className="text-gray-300"> em {selectedCategory}</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-xs text-microshop-yellow-bright hover:text-microshop-yellow hover:underline focus:outline-none transition-colors"
                >
                  Limpar ✕
                </button>
              </div>
            )}
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Account */}
            <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
              <div className="flex flex-col leading-tight text-xs">
                <span className="text-gray-300">Olá, Visitante</span>
                <span className="font-bold">Conta e Listas</span>
              </div>
            </div>

            {/* Orders */}
            <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
              <div className="flex flex-col leading-tight text-xs">
                <span className="text-gray-300">Devoluções</span>
                <span className="font-bold">e Pedidos</span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors relative">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-microshop-orange-dark text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
              <span className="font-bold text-sm ml-1">Carrinho</span>
            </div>
          </div>
        </div>

        <div className="bg-microshop-blue px-4 py-2 w-full">
          <div className="max-w-[1500px] mx-auto flex items-center gap-6 text-sm">
            <button className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="font-bold">Todos</span>
            </button>
            <a
              href="#"
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
            >
              Mais Vendidos
            </a>
            <a
              href="#"
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
            >
              Ofertas do Dia
            </a>
            <a
              href="#"
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
            >
              Prime
            </a>
            <a
              href="#"
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
            >
              Atendimento ao Cliente
            </a>
            <a
              href="#"
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
            >
              Livros
            </a>
            <a
              href="#"
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
            >
              Eletrônicos
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[1500px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Products Section */}
            <div className="space-y-4">
              <ErrorBoundary mfeName="Products">
                <Suspense fallback={<LoadingFallback text="Carregando produtos..." />}>
                  <Products />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Cart Section */}
            <div className="lg:sticky lg:top-6 self-start">
              <ErrorBoundary mfeName="Cart">
                <Suspense fallback={<LoadingFallback text="Carregando carrinho..." />}>
                  <Cart />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-microshop-blue text-white mt-12">
        <button
          onClick={scrollToTop}
          className="w-full bg-microshop-blue-light hover:bg-microshop-blue-hover text-center py-3 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-microshop-orange focus:ring-inset"
          aria-label="Voltar ao topo"
        >
          <span className="text-sm font-medium">Voltar ao topo</span>
        </button>

        {/* Footer Links */}
        <div className="max-w-[1500px] mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-3">Conheça-nos</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">Carreiras</li>
                <li className="hover:underline cursor-pointer">Blog</li>
                <li className="hover:underline cursor-pointer">Sobre o MicroShop</li>
                <li className="hover:underline cursor-pointer">Relações com Investidores</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Ganhe Dinheiro</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">Venda na MicroShop</li>
                <li className="hover:underline cursor-pointer">Anuncie seus produtos</li>
                <li className="hover:underline cursor-pointer">Publique seu livro</li>
                <li className="hover:underline cursor-pointer">Seja afiliado</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Pagamento</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">Cartões de crédito</li>
                <li className="hover:underline cursor-pointer">Cartões de débito</li>
                <li className="hover:underline cursor-pointer">Pix</li>
                <li className="hover:underline cursor-pointer">Boleto</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Deixe-nos ajudá-lo</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:underline cursor-pointer">Sua conta</li>
                <li className="hover:underline cursor-pointer">Frete e prazo de entrega</li>
                <li className="hover:underline cursor-pointer">Devoluções e reembolsos</li>
                <li className="hover:underline cursor-pointer">Ajuda</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-microshop-dark py-6">
          <div className="max-w-[1500px] mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🏪</span>
              <span className="text-lg font-bold">MicroShop</span>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 MicroShop - Demonstração de Microfrontends com Module Federation
            </p>
            <p className="text-xs text-gray-500 mt-2">
              React 18.3.1 + TypeScript + Tailwind CSS + Zustand
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoadingFallback({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-microshop-orange-dark rounded-full animate-spin mb-4" />
      <p className="text-base font-medium text-gray-600">{text}</p>
    </div>
  );
}

export default App;
