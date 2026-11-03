import { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  cartTotal: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

export default function Checkout({ cart, cartTotal, onClose, onOrderComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-amber-100 p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <span>📋</span> 确认订单
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">订单商品</h3>
            <div className="space-y-2 bg-amber-50/50 rounded-xl p-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="text-amber-800 truncate flex-1">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-amber-900 font-medium ml-2">
                    ¥{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-amber-200 mt-2 pt-2 flex items-center justify-between">
                <span className="text-amber-600 text-sm">配送费</span>
                <span className="text-green-600 text-sm font-medium">免运费</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-900 font-semibold">合计</span>
                <span className="text-xl font-bold text-amber-900">¥{cartTotal}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1.5">收货人</label>
                <input
                  type="text"
                  required
                  placeholder="请输入姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1.5">联系电话</label>
                <input
                  type="tel"
                  required
                  placeholder="请输入手机号"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1.5">收货地址</label>
                <textarea
                  required
                  placeholder="请输入详细地址"
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1.5">备注（选填）</label>
                <input
                  type="text"
                  placeholder="如研磨方式、特殊要求等"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-amber-900 mb-3">支付方式</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-3 flex items-center gap-2 cursor-pointer">
                  <span className="text-lg">💳</span>
                  <span className="text-sm font-medium text-amber-800">微信支付</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:border-amber-300 transition-colors">
                  <span className="text-lg">📱</span>
                  <span className="text-sm font-medium text-amber-600">支付宝</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-amber-800 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-800/20 active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  处理中...
                </>
              ) : (
                <>确认支付 ¥{cartTotal}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
