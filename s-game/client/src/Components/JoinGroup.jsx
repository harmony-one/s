import React, { useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import TopGroups from './TopGroups';
import { maxWidth } from '@mui/system';
  
const JoinGroup = () => {
    const handleAddConnection = () => {
        
    };

  return (
    <div>
        <Typography variant="h5">Join Group</Typography>
        <Box display="flex" alignItems="center">
            <Typography variant="h2" component="span">#</Typography>
             <TextField 
                variant='outlined' 
                inputProps={{ 
                    style: { fontSize: '1.5rem' }
                }}
            />
        </Box>
        <Button variant='contained' onClick={handleAddConnection}>Join Group</Button>
        <Typography variant="h5" sx={{marginTop: 5, marginBottom: 1}}>Top Groups</Typography>
        <div style={{ width: '100%' }}>
            <TopGroups />
        </div>
    </div>
  )
}

export default JoinGroup