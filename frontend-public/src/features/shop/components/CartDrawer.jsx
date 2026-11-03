import { useCartStore } from '../store/cartStore';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, getSubtotal } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const shipping = items.length > 0 ? 300 : 0;
  const total = subtotal + shipping;
  const money = (n) => 'PKR ' + Number(n).toLocaleString('en-PK');

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={closeCart} />

      {/* Panel */}
      <aside className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl z-[101]">
        <header className="shrink-0 p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-600" />
            Your Cart ({items.length})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag size={48} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-600">Your cart is empty</h3>
              <Link
                to="/shop"
                onClick={closeCart}
                className="inline-block bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-100"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/80?text=Product'}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-200"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{item.name}</h4>
                  <div className="text-xs text-slate-500">{item.unit}</div>
                  <div className="text-sm font-black text-amber-700">{money(item.price)}</div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                      className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="ml-auto text-rose-600 bg-rose-50 w-7 h-7 rounded-lg flex items-center justify-center"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <footer className="shrink-0 border-t border-slate-200 p-5 space-y-3 bg-white">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold">{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Estimated Shipping</span>
              <span className="font-semibold">{money(shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount</span>
              <span className="text-amber-700">{money(total)}</span>
            </div>

            {/* Solid clickable button */}
            <Link
              to="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-4 rounded-xl shadow-lg"
            >
              Proceed to Checkout →
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}