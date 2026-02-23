'use client';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Toolbar,
} from '@mui/material';
import { People, ShoppingBag, TrendingUp, Star } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

const stats = [
  {
    label: 'Total Users',
    value: '208',
    icon: <People fontSize='large' />,
    color: '#1976d2',
  },
  {
    label: 'Total Products',
    value: '194',
    icon: <ShoppingBag fontSize='large' />,
    color: '#388e3c',
  },
  {
    label: 'Active Sessions',
    value: '42',
    icon: <TrendingUp fontSize='large' />,
    color: '#f57c00',
  },
  {
    label: 'Avg Rating',
    value: '4.2',
    icon: <Star fontSize='large' />,
    color: '#7b1fa2',
  },
];

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />
        <Typography variant='h4' fontWeight={700} mb={3}>
          Dashboard Overview
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        {stat.label}
                      </Typography>
                      <Typography variant='h4' fontWeight={700}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
