import { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-colors shadow-md"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <span className="bg-white/90 backdrop-blur-sm text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900">{product.name}</h2>
              <p className="text-amber-600 mt-1">{product.origin} · {product.roast}</p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
              <span className="text-amber-500">★</span>
              <span className="text-amber-800 font-semibold">{product.rating}</span>
            </div>
          </div>

          <p className="text-amber-800/80 leading-relaxed mb-6">{product.description}</p>

          {/* Flavor Profile */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-amber-900 mb-2">风味描述</h4>
            <div className="flex flex-wrap gap-2">
              {product.flavor.map((f) => (
                <span
                  key={f}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-sm px-3 py-1.5 rounded-full border border-amber-200"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-amber-50/50 rounded-xl">
            <div className="text-center">
              <p className="text-xs text-amber-500 mb-1">烘焙度</p>
              <p className="text-sm font-semibold text-amber-900">{product.roast}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-amber-500 mb-1">规格</p>
              <p className="text-sm font-semibold text-amber-900">{product.weight}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-amber-500 mb-1">产地</p>
              <p className="text-sm font-semibold text-amber-900">{product.origin}</p>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-100">
            <div>
              <p className="text-sm text-amber-500">单价</p>
              <p className="text-3xl font-bold text-amber-900">¥{product.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-amber-50 rounded-full border border-amber-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-amber-700 hover:bg-amber-100 rounded-l-full transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-amber-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-amber-700 hover:bg-amber-100 rounded-r-full transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-800/20 active:scale-95"
              >
                加入购物车 · ¥{product.price * quantity}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
