'use client';
import { useEffect, useState, use, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Rating,
  Divider,
  LinearProgress,
  Toolbar,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from '@/components/Loader';
import useProductStore from '@/store/productStore';

export default function ProductDetailPage({ params }) {
  // Next.js 16: params is a Promise, unwrap with React.use()
  const { id } = use(params);
  const router = useRouter();
  const { selectedProduct, loading, fetchProductById } = useProductStore();
  const [activeImg, setActiveImg] = useState(0);

  // Reset active image index when product id changes
  const numericId = Number(id);
  const [prevId, setPrevId] = useState(numericId);
  if (numericId !== prevId) {
    setPrevId(numericId);
    setActiveImg(0);
  }

  useEffect(() => {
    fetchProductById(numericId);
  }, [numericId, fetchProductById]);

  const p = selectedProduct;

  return (
    <ProtectedRoute>
      <Navbar />
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />

        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/products')}
          sx={{ mb: 2 }}>
          Back to Products
        </Button>

        {loading ? (
          <Loader />
        ) : (
          p && (
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  {/* Image Carousel */}
                  <Grid item xs={12} md={6}>
                    <Box
                      component='img'
                      src={p.images?.[activeImg] || p.thumbnail}
                      alt={p.title}
                      sx={{
                        width: '100%',
                        borderRadius: 2,
                        maxHeight: 400,
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                      {p.images?.map((img, i) => (
                        <Box
                          key={i}
                          component='img'
                          src={img}
                          alt=''
                          onClick={() => setActiveImg(i)}
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: 'cover',
                            borderRadius: 1,
                            cursor: 'pointer',
                            border:
                              i === activeImg
                                ? '3px solid #1976d2'
                                : '3px solid transparent',
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Details */}
                  <Grid item xs={12} md={6}>
                    <Chip
                      label={p.category}
                      sx={{ mb: 1, textTransform: 'capitalize' }}
                    />
                    <Typography variant='h4' fontWeight={700}>
                      {p.title}
                    </Typography>
                    <Typography color='text.secondary' mt={1} mb={2}>
                      {p.description}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}>
                      <Typography
                        variant='h4'
                        color='primary.main'
                        fontWeight={700}>
                        ${p.price}
                      </Typography>
                      {p.discountPercentage > 0 && (
                        <Chip
                          label={`${p.discountPercentage}% OFF`}
                          color='error'
                          size='small'
                        />
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 1,
                      }}>
                      <Rating value={p.rating} precision={0.1} readOnly />
                      <Typography>({p.rating})</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography mb={1}>
                      <strong>Brand:</strong> {p.brand}
                    </Typography>
                    <Typography mb={2}>
                      <strong>Stock:</strong> {p.stock} units
                    </Typography>

                    <Typography variant='body2' gutterBottom>
                      Stock Level
                    </Typography>
                    <LinearProgress
                      variant='determinate'
                      value={Math.min((p.stock / 100) * 100, 100)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )
        )}
      </Box>
    </ProtectedRoute>
  );
}
