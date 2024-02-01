import React from 'react';
import { Button, Stack } from '@mui/material';

const words = ["ONE", "Harmonauts", "ef"];

const TopGroups = () => {
  return (
    <Stack 
      direction="row"
      spacing={1}
      wrap="wrap"
      sx={{ width: '100%', overflow: 'hidden' }}
    >
      {words.map((word, index) => (
        <Button 
          key={index} 
          variant="outlined" 
          sx={{ 
            borderRadius: '20px', 
            mb: 1,
            flex: '0 0 auto' // Ensure buttons don't shrink and have their own space
          }}
        >
          #{word}
        </Button>
      ))}
    </Stack>
  );
};

export default TopGroups;
