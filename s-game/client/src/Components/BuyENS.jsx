import React, { useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import TopGroups from './TopGroups';
import { maxWidth } from '@mui/system';
  
const BuyENS = () => {
    const handleAddConnection = () => {
        
    };

  return (
    <div>
        <Typography variant="h5">ENS</Typography>
        <Box display="flex" alignItems="center">
             <TextField 
                variant='outlined' 
                inputProps={{ 
                    style: { fontSize: '1.5rem' }
                }}
            />
            <Typography variant="h4" component="span">.country</Typography>
        </Box>
        <Button variant='contained' sx={{marginTop: 1}} onClick={handleAddConnection}>Purchase</Button>
    </div>
  )
}

export default BuyENS