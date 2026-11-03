import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        const items = get().items;
        const targetId = product._id || product.id;
        const existing = items.find(i => i.productId === targetId);

        if (existing) {
          set({
            items: items.map(i =>
              i.productId === targetId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, {
              productId: targetId,
              name: product.name,
              image: product.image,
              unit: product.unit || 'pcs',
              category: product.category,
              price: Number(product.discountPrice || product.price),
              quantity: 1,
            }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.productId !== productId) });
      },

      updateQty: (productId, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map(i =>
            i.productId === productId ? { ...i, quantity: Number(qty) } : i
          )
        });
      },

      clearCart: () => set({ items: [], isOpen: false }),

      getSubtotal: () => get().items.reduce((sum, i) => sum + (Number(i.price) * i.quantity), 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'gtp-cart-storage' }
  )
);