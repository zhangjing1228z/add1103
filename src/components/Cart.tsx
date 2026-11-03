import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  cartTotal: number;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ cart, cartTotal, onClose, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-100">
          <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <span>🛒</span> 购物车
            {cart.length > 0 && (
              <span className="text-sm font-normal text-amber-500">({cart.length}件商品)</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-amber-800 font-medium">购物车是空的</p>
              <p className="text-amber-500 text-sm mt-1">快去挑选心仪的咖啡吧</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-amber-50/50 rounded-xl p-3 border border-amber-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-amber-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-amber-500 text-xs mt-0.5">{item.product.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-800 font-bold">¥{item.product.price * item.quantity}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-amber-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="w-7 h-7 rounded-full bg-white border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors text-xs ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-amber-100 p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-amber-600">合计</span>
              <span className="text-2xl font-bold text-amber-900">¥{cartTotal}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-amber-800 hover:bg-amber-700 text-white py-3.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-800/20 active:scale-[0.98]"
            >
              去结算
            </button>
            <p className="text-center text-xs text-amber-400 mt-2">全国包邮 · 新鲜烘焙</p>
          </div>
        )}
      </div>
    </div>
  );
}
