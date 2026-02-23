import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiPost } from '@/services/api';

/*
  Why Zustand?
  - Zero boilerplate vs Redux (no reducers, actions, dispatch)
  - Async actions work natively with async/await
  - persist middleware syncs to localStorage automatically
  - Tiny bundle, perfect for small-medium apps
*/

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (username, password) => {
        const data = await apiPost('/auth/login', {
          username,
          password,
          expiresInMins: 60,
        });
        set({
          token: data.accessToken,
          user: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            image: data.image,
          },
          isAuthenticated: true,
        });
      },

      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' },
  ),
);

export default useAuthStore;
