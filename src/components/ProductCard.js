'use client';
import { memo } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  Rating,
} from '@mui/material';
import { useRouter } from 'next/navigation';

// React.memo prevents re-render if product prop hasn't changed
const ProductCard = memo(function ProductCard({ product }) {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: 2,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)' },
      }}>
      <CardActionArea
        sx={{ height: '100%' }}
        onClick={() => router.push(`/products/${product.id}`)}>
        <CardMedia
          component='img'
          height='200'
          image={product.thumbnail}
          alt={product.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Chip
            label={product.category}
            size='small'
            sx={{ mb: 1, textTransform: 'capitalize' }}
          />
          <Typography variant='subtitle1' fontWeight={600} noWrap>
            {product.title}
          </Typography>
          <Typography variant='h6' color='primary.main' fontWeight={700}>
            ${product.price}
          </Typography>
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size='small'
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ProductCard;
