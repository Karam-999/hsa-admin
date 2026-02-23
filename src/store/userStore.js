import { create } from 'zustand';
import { apiFetch } from '@/services/api';
import { CACHE_TTL, USERS_LIMIT } from '@/utils/constants';

/*
  Caching Strategy (Client-Side):
  - Each unique API query (skip + limit + search) gets its own cache key
  - Cached entries store { data, total, timestamp }
  - On fetch, we first check the cache:
    - If a valid (< CACHE_TTL) entry exists → return cached data instantly (no API call)
    - Otherwise → fetch from API, then update cache
  - Benefits:
    - Paginating back to a previously visited page is instant
    - Repeating the same search doesn't hit the API again
    - Keeps the app responsive when switching between pages quickly
  - Cache is kept in-memory (Zustand state), so it resets on page reload
*/

const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  selectedUser: null,
  loading: false,
  error: null,
  cache: {},

  fetchUsers: async (limit = USERS_LIMIT, skip = 0, search = '') => {
    const cacheKey = `${skip}-${limit}-${search}`;
    const cached = get().cache[cacheKey];

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      set({ users: cached.data, total: cached.total });
      return;
    }

    set({ loading: true, error: null });
    try {
      const path = search
        ? `/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `/users?limit=${limit}&skip=${skip}`;

      const data = await apiFetch(path);
      set({
        users: data.users,
        total: data.total,
        loading: false,
        cache: {
          ...get().cache,
          [cacheKey]: {
            data: data.users,
            total: data.total,
            timestamp: Date.now(),
          },
        },
      });
    } catch (err) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },

  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch(`/users/${id}`);
      set({ selectedUser: data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch user', loading: false });
    }
  },
}));

export default useUserStore;
