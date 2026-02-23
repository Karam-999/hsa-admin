'use client';
import { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

// React.memo avoids re-rendering the entire table unless users/loading change
const UserTable = memo(function UserTable({ users, loading }) {
  const router = useRouter();

  if (loading) return <Loader />;

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'primary.main' }}>
          <TableRow>
            {['Avatar', 'Name', 'Email', 'Gender', 'Phone', 'Company'].map(
              (h) => (
                <TableCell key={h} sx={{ color: 'white', fontWeight: 700 }}>
                  {h}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push(`/users/${user.id}`)}>
              <TableCell>
                <Avatar src={user.image} />
              </TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.gender}
                  size='small'
                  color={user.gender === 'male' ? 'primary' : 'secondary'}
                />
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default UserTable;
