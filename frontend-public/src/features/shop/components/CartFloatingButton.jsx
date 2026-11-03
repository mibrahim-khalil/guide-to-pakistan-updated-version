import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartFloatingButton() {
  const { openCart, getCount, isOpen } = useCartStore();
  const count = getCount();

  if (isOpen) return null; // hide when drawer open

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 bg-amber-600 hover:bg-amber-700 text-white rounded-full w-14 h-14 shadow-2xl flex items-center justify-center"
    >
      <ShoppingBag size={22} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
          {count}
        </span>
      )}
    </button>
  );
}