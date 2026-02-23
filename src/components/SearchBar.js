import { memo } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

// React.memo prevents re-render when sibling state changes but search props stay the same
const SearchBar = memo(function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
}) {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{ bgcolor: 'white' }}
    />
  );
});

export default SearchBar;
