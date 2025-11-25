import React, { useState } from 'react';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AIAssistant from './components/AIAssistant';
import { ShoppingBag, Search, Menu, Facebook, Instagram, Twitter } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckoutConfirm = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-mate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-mate-800 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
                M
              </div>
              <span className="font-serif text-2xl font-bold text-mate-900 tracking-tight">MateStyle</span>
            </div>

            <div className="hidden md:flex space-x-8 text-mate-700 font-medium">
              <button onClick={() => setActiveCategory('todos')} className={`hover:text-mate-900 ${activeCategory === 'todos' ? 'text-mate-900 underline decoration-mate-500 decoration-2 underline-offset-4' : ''}`}>Inicio</button>
              <button onClick={() => setActiveCategory('mate')} className={`hover:text-mate-900 ${activeCategory === 'mate' ? 'text-mate-900 underline decoration-mate-500 decoration-2 underline-offset-4' : ''}`}>Mates</button>
              <button onClick={() => setActiveCategory('bombilla')} className={`hover:text-mate-900 ${activeCategory === 'bombilla' ? 'text-mate-900 underline decoration-mate-500 decoration-2 underline-offset-4' : ''}`}>Bombillas</button>
              <button onClick={() => setActiveCategory('set')} className={`hover:text-mate-900 ${activeCategory === 'set' ? 'text-mate-900 underline decoration-mate-500 decoration-2 underline-offset-4' : ''}`}>Sets</button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-mate-50 border border-mate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-mate-400 w-48 transition-all focus:w-64"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-mate-400" />
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-mate-800 hover:bg-mate-100 rounded-full transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button className="md:hidden p-2 text-mate-800">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-mate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left space-y-6">
            <span className="text-mate-300 font-medium tracking-wider text-sm uppercase">Artesanía Argentina</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              La Tradición de <br/>
              <span className="text-amber-500">Un Buen Mate</span>
            </h1>
            <p className="text-mate-100 text-lg max-w-lg mx-auto md:mx-0">
              Personalizamos tu compañero de todos los días. Mates imperiales, camioneros y bombillas premium con la mejor calidad del mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button 
                onClick={() => { setActiveCategory('mate'); window.scrollTo({ top: 800, behavior: 'smooth' })}}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-amber-500/20"
              >
                Ver Colección
              </button>
              <button 
                 onClick={() => { setActiveCategory('todos'); window.scrollTo({ top: 800, behavior: 'smooth' })}}
                 className="bg-transparent border border-white/30 hover:bg-white/10 px-8 py-3 rounded-full font-medium transition-all"
              >
                Explorar Todo
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center relative">
             <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-amber-500/20 to-mate-500/20 absolute blur-3xl"></div>
             <img 
               src="https://picsum.photos/id/102/600/600" 
               alt="Mate Imperial" 
               className="relative rounded-3xl shadow-2xl border-4 border-mate-800 rotate-3 hover:rotate-0 transition-transform duration-500 w-80 md:w-96" 
             />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-mate-900">Nuestros Productos</h2>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
             {/* Mobile Filter Pills */}
             {['todos', 'mate', 'bombilla', 'accesorio', 'set'].map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                   activeCategory === cat 
                   ? 'bg-mate-800 text-white' 
                   : 'bg-mate-100 text-mate-700 hover:bg-mate-200'
                 }`}
               >
                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
               </button>
             ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <p className="text-xl text-gray-500">No encontramos productos con esa búsqueda.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('todos')}}
              className="mt-4 text-mate-600 font-medium underline"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-mate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-mate-50">
                       <ShoppingBag className="w-5 h-5 text-mate-900" onClick={() => handleAddToCart(product)} />
                    </button>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wide">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-mate-900 leading-tight mb-2 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-mate-900">${product.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-mate-800 hover:bg-mate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-mate-900 text-mate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-serif font-bold">
                M
              </div>
              <span className="font-serif text-xl font-bold text-white">MateStyle</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Llevando la tradición argentina a cada rincón. Artesanía de calidad, diseños personalizados y pasión por el mate.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Nuestros Mates</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Cómo Curar tu Mate</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
            </div>
            <p className="mt-6 text-xs text-mate-500">© 2024 MateStyle. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Components */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onConfirm={handleCheckoutConfirm}
      />

      <AIAssistant />
    </div>
  );
};

export default App;