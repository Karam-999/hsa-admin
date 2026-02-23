'use client';
import { memo, useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { Dashboard, People, ShoppingBag } from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const navLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Dashboard fontSize='small' />,
  },
  { label: 'Users', href: '/users', icon: <People fontSize='small' /> },
  {
    label: 'Products',
    href: '/products',
    icon: <ShoppingBag fontSize='small' />,
  },
];

// React.memo prevents unnecessary re-renders when parent re-renders
const Navbar = memo(function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [anchor, setAnchor] = useState(null);

  const handleLogout = useCallback(async () => {
    logout();
    await signOut({ redirect: false });
    router.push('/login');
  }, [logout, router]);

  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant='h6'
          sx={{ mr: 4, cursor: 'pointer' }}
          onClick={() => router.push('/dashboard')}>
          HSA Admin
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              startIcon={link.icon}
              onClick={() => router.push(link.href)}
              sx={{
                color: 'white',
                textTransform: 'none',
                bgcolor:
                  pathname === link.href
                    ? 'rgba(255,255,255,0.15)'
                    : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
              }}>
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Mobile spacer */}
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant='body2'
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
            <Avatar src={user?.image} sx={{ width: 36, height: 36 }} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}>
          {/* Mobile-only nav links inside the menu */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {navLinks.map((link) => (
              <MenuItem
                key={link.href}
                onClick={() => {
                  setAnchor(null);
                  router.push(link.href);
                }}>
                {link.label}
              </MenuItem>
            ))}
          </Box>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
