import { create } from 'zustand';
import { apiFetch } from '@/services/api';
import { CACHE_TTL, PRODUCTS_LIMIT } from '@/utils/constants';

/*
  Product Store — Zustand
  - Manages products list, selected product, categories, and client-side cache
  - Async actions (fetchProducts, fetchProductById, fetchCategories) are
    defined directly in the store — no thunk middleware needed
  - Cache uses the same key-based TTL strategy as userStore
    (see userStore.js for full explanation of caching approach)
*/
const useProductStore = create((set, get) => ({
  products: [],
  total: 0,
  selectedProduct: null,
  categories: [],
  loading: false,
  error: null,
  cache: {},

  fetchProducts: async (
    limit = PRODUCTS_LIMIT,
    skip = 0,
    search = '',
    category = '',
  ) => {
    const cacheKey = `${skip}-${limit}-${search}-${category}`;
    const cached = get().cache[cacheKey];

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      set({ products: cached.data, total: cached.total });
      return;
    }

    set({ loading: true, error: null });
    try {
      let path;
      if (search)
        path = `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      else if (category)
        path = `/products/category/${category}?limit=${limit}&skip=${skip}`;
      else path = `/products?limit=${limit}&skip=${skip}`;

      const data = await apiFetch(path);
      set({
        products: data.products,
        total: data.total,
        loading: false,
        cache: {
          ...get().cache,
          [cacheKey]: {
            data: data.products,
            total: data.total,
            timestamp: Date.now(),
          },
        },
      });
    } catch (err) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch(`/products/${id}`);
      set({ selectedProduct: data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch product', loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const data = await apiFetch('/products/categories');
      set({ categories: data.map((c) => c.slug) });
    } catch (err) {
      set({ error: 'Failed to fetch categories' });
    }
  },
}));

export default useProductStore;
