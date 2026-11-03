import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, onProductClick, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-amber-100 hover:border-amber-200"
        >
          {/* Image */}
          <div
            className="relative h-52 sm:h-56 overflow-hidden cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-amber-900/80 backdrop-blur-sm text-amber-50 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>★</span> {product.rating}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white/80 text-xs">{product.roast} · {product.weight}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className="font-bold text-amber-900 text-lg mb-1 cursor-pointer hover:text-amber-700 transition-colors"
              onClick={() => onProductClick(product)}
            >
              {product.name}
            </h3>
            <p className="text-amber-600 text-sm mb-3">{product.origin}</p>

            {/* Flavor Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.flavor.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-100"
                >
                  {f}
                </span>
              ))}
              {product.flavor.length > 3 && (
                <span className="text-amber-400 text-xs py-0.5">+{product.flavor.length - 3}</span>
              )}
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-amber-900">¥{product.price}</span>
                <span className="text-amber-500 text-sm ml-1">/{product.weight}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-800/20 active:scale-95"
              >
                加入购物车
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
