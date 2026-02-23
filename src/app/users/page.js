'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Box, Typography, Pagination, Toolbar } from '@mui/material';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import SearchBar from '@/components/SearchBar';
import UserTable from '@/components/UserTable';
import useUserStore from '@/store/userStore';
import { USERS_LIMIT } from '@/utils/constants';

export default function UsersPage() {
  const { users, total, loading, fetchUsers } = useUserStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchUsers(USERS_LIMIT, (page - 1) * USERS_LIMIT, debounced);
  }, [page, debounced, fetchUsers]);

  const totalPages = useMemo(() => Math.ceil(total / USERS_LIMIT), [total]);
  const handlePageChange = useCallback((_, val) => setPage(val), []);

  return (
    <ProtectedRoute>
      <Navbar />
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />
        <Typography variant='h4' fontWeight={700} mb={3}>
          Users
        </Typography>

        <Box mb={3}>
          <SearchBar
            value={search}
            placeholder='Search users by name...'
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Box>

        <UserTable users={users} loading={loading} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color='primary'
            shape='rounded'
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
