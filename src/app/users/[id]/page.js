'use client';
import { useEffect, use } from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  Toolbar,
} from '@mui/material';
import {
  ArrowBack,
  Email,
  Phone,
  Business,
  LocationOn,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from '@/components/Loader';
import useUserStore from '@/store/userStore';

export default function UserDetailPage({ params }) {
  // Next.js 16: params is a Promise, unwrap with React.use()
  const { id } = use(params);
  const router = useRouter();
  const { selectedUser, loading, fetchUserById } = useUserStore();

  useEffect(() => {
    fetchUserById(Number(id));
  }, [id, fetchUserById]);

  return (
    <ProtectedRoute>
      <Navbar />
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />

        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/users')}
          sx={{ mb: 2 }}>
          Back to Users
        </Button>

        {loading ? (
          <Loader />
        ) : (
          selectedUser && (
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    mb: 3,
                    flexWrap: 'wrap',
                  }}>
                  <Avatar
                    src={selectedUser.image}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography variant='h4' fontWeight={700}>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </Typography>
                    <Chip
                      label={selectedUser.gender}
                      color={
                        selectedUser.gender === 'male' ? 'primary' : 'secondary'
                      }
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6' fontWeight={600} mb={2}>
                      Contact
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        mb: 1,
                        alignItems: 'center',
                      }}>
                      <Email color='primary' />
                      <Typography>{selectedUser.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Phone color='primary' />
                      <Typography>{selectedUser.phone}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant='h6' fontWeight={600} mb={2}>
                      Company
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        mb: 1,
                        alignItems: 'center',
                      }}>
                      <Business color='primary' />
                      <Typography>
                        {selectedUser.company?.name} —{' '}
                        {selectedUser.company?.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <LocationOn color='primary' />
                      <Typography>
                        {selectedUser.address?.city},{' '}
                        {selectedUser.address?.state},{' '}
                        {selectedUser.address?.country}
                      </Typography>
                    </Box>
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
