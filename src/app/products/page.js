'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Pagination,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import useProductStore from '@/store/productStore';
import { PRODUCTS_LIMIT } from '@/utils/constants';

export default function ProductsPage() {
  const {
    products,
    total,
    loading,
    categories,
    fetchProducts,
    fetchCategories,
  } = useProductStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [debounced, setDebounced] = useState('');

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    // When category is selected, clear search to avoid API conflict
    // DummyJSON doesn't support search + category filter simultaneously
    fetchProducts(
      PRODUCTS_LIMIT,
      (page - 1) * PRODUCTS_LIMIT,
      category ? '' : debounced,
      debounced ? '' : category,
    );
  }, [page, debounced, category, fetchProducts]);

  const totalPages = useMemo(() => Math.ceil(total / PRODUCTS_LIMIT), [total]);
  const handlePageChange = useCallback((_, val) => setPage(val), []);

  return (
    <ProtectedRoute>
      <Navbar />
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />
        <Typography variant='h4' fontWeight={700} mb={3}>
          Products
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flexGrow: 1 }}>
            <SearchBar
              value={search}
              placeholder='Search products...'
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Box>
          <FormControl sx={{ minWidth: 200, bgcolor: 'white' }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label='Category'
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}>
              <MenuItem value=''>All Categories</MenuItem>
              {categories.map((c) => (
                <MenuItem
                  key={c}
                  value={c}
                  sx={{ textTransform: 'capitalize' }}>
                  {c.replace(/-/g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
