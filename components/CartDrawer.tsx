import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-mate-50">
          <h2 className="text-xl font-serif font-bold text-mate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Tu Carrito
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-mate-200 rounded-full transition-colors text-mate-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-mate-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="text-lg font-medium">El carrito está vacío</p>
              <button
                onClick={onClose}
                className="text-mate-600 hover:text-mate-800 font-medium underline"
              >
                Ver productos
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-start group">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-mate-900 truncate">{item.name}</h3>
                  <p className="text-mate-600 font-semibold mt-1">${item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-mate-600 hover:bg-mate-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-mate-600 hover:bg-mate-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-mate-50 border-t border-mate-100 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-mate-900">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-mate-800 text-white py-4 rounded-xl font-medium hover:bg-mate-900 transition-all active:scale-[0.99] shadow-lg shadow-mate-200"
            >
              Iniciar Compra
            </button>
            <p className="text-xs text-center text-mate-500">
              El pago y envío se coordinan directamente con el vendedor.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;