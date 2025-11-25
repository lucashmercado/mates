import React, { useState } from 'react';
import { X, Smartphone, CheckCircle, Wallet, Banknote } from 'lucide-react';
import { CartItem, CheckoutDetails } from '../types';
import { SELLER_PHONE_NUMBER } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onConfirm: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, onConfirm }) => {
  const [details, setDetails] = useState<CheckoutDetails>({
    name: '',
    address: '',
    paymentMethod: 'Transferencia',
    notes: '',
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const itemsList = cartItems
      .map((item) => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})`)
      .join('\n');

    const message = `Hola! 👋 Quiero realizar el siguiente pedido en MateStyle:\n\n` +
      `*Productos:*\n${itemsList}\n\n` +
      `*Total: $${total.toLocaleString()}*\n\n` +
      `*Mis Datos:*\n` +
      `👤 Nombre: ${details.name}\n` +
      `📍 Envío/Retiro: ${details.address}\n` +
      `💳 Método de Pago: ${details.paymentMethod}\n` +
      (details.notes ? `📝 Notas: ${details.notes}` : '');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SELLER_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-mate-800 p-6 flex justify-between items-center">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Finalizar Pedido
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-sm text-orange-800">
            <p className="font-semibold mb-1">ℹ️ Cómo funciona</p>
            Al confirmar, se abrirá WhatsApp con los detalles de tu pedido para coordinar el pago y el envío directamente con nosotros.
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
              <input
                required
                type="text"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mate-500 focus:border-mate-500 outline-none transition-all"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Envío (o 'Retiro en local')</label>
              <input
                required
                type="text"
                value={details.address}
                onChange={(e) => setDetails({ ...details, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mate-500 focus:border-mate-500 outline-none transition-all"
                placeholder="Av. Siempreviva 123, CABA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago Preferido</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDetails({ ...details, paymentMethod: 'Transferencia' })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                    details.paymentMethod === 'Transferencia'
                      ? 'border-mate-600 bg-mate-50 text-mate-800 ring-1 ring-mate-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  Transferencia
                </button>
                <button
                  type="button"
                  onClick={() => setDetails({ ...details, paymentMethod: 'Efectivo' })}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                    details.paymentMethod === 'Efectivo'
                      ? 'border-mate-600 bg-mate-50 text-mate-800 ring-1 ring-mate-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  Efectivo
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas Adicionales (Opcional)</label>
              <textarea
                rows={2}
                value={details.notes}
                onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mate-500 focus:border-mate-500 outline-none transition-all"
                placeholder="Quiero grabado de iniciales, horario preferido..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
             <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-900">
              <span>Total a Pagar:</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-green-200"
            >
              <CheckCircle className="w-5 h-5" />
              Enviar Pedido por WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;