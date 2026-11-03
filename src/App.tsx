import { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import { products, categories } from './data/products';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Hero from './components/Hero';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavor.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === '全部' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setOrderComplete(true);
    setIsCheckoutOpen(false);
    setCart([]);
    setTimeout(() => setOrderComplete(false), 3000);
  };

  return (
    <div className="min-h-screen bg-amber-50/30 font-sans">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-900 text-amber-50 shadow-lg shadow-amber-900/20'
                  : 'bg-white text-amber-900 border border-amber-200 hover:border-amber-400 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <ProductGrid
          products={filteredProducts}
          onProductClick={setSelectedProduct}
          onAddToCart={addToCart}
        />

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">☕</div>
            <p className="text-amber-800 text-lg">没有找到匹配的咖啡</p>
            <p className="text-amber-600 mt-2">试试其他关键词或分类吧</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-amber-50">匠心咖啡</h3>
              <p className="text-amber-300/80 text-sm leading-relaxed">
                我们精选全球优质产区的精品咖啡豆，以匠心烘焙，只为呈现每一颗咖啡豆最纯粹的风味。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-50">关于我们</h4>
              <ul className="space-y-2 text-sm text-amber-300/80">
                <li>品牌故事</li>
                <li>烘焙工艺</li>
                <li>产地直采</li>
                <li>联系我们</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-50">客户服务</h4>
              <ul className="space-y-2 text-sm text-amber-300/80">
                <li>配送说明</li>
                <li>退换政策</li>
                <li>常见问题</li>
                <li>会员计划</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-400/60">
            © 2026 匠心咖啡 · 用心做好每一杯
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {isCartOpen && (
        <Cart
          cart={cart}
          cartTotal={cartTotal}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          cartTotal={cartTotal}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* Order Complete Toast */}
      {orderComplete && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span className="font-medium">下单成功！感谢您的购买</span>
          </div>
        </div>
      )}
    </div>
  );
}
