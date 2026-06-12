import React from 'react'
import { TextField, Box } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function SearchBar({ placeholder = 'Search...', onSearch, debounceMs = 300 }) {
  const [value, setValue] = React.useState('')
  const timeoutRef = React.useRef(null)

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onSearch(newValue)
    }, debounceMs)
  }

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{ bgcolor: 'background.paper' }}
      />
    </Box>
  )
}
