import { memo } from 'react';
import { Box, CircularProgress } from '@mui/material';

// React.memo avoids unnecessary re-renders since Loader takes no props
const Loader = memo(function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
      }}>
      <CircularProgress />
    </Box>
  );
});

export default Loader;
