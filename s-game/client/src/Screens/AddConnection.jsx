import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import { Navbar, WalletConnectButton } from '../Components';
import { styled } from '@mui/material/styles';
import EstablishConnection from '../Components/EstablishConnection';

const AddConnection = () => {
  const drawerWidth = 240;

  const [open, setOpen] = React.useState(false);
  const [myOTP, setMyOTP] = useState('');

  useEffect(() => {
    // Function to update OTP from local storage
    const updateMyOTP = () => {
        const storedOTP = localStorage.getItem('myOTP');
        setMyOTP(storedOTP);
    };

    // Add event listener
    window.addEventListener('myOTPUpdated', updateMyOTP);

    // Initial update
    updateMyOTP();

    // Remove event listener on cleanup
    return () => {
        window.removeEventListener('myOTPUpdated', updateMyOTP);
    };
}, []);

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <Box sx={{ display: 'flex' }}>
    <Navbar open={open} setOpen={setOpen} pageTitle="Add Connection" />
    <Main open={open}>
      <DrawerHeader />
      { myOTP ? 
      <EstablishConnection myOTP={myOTP} /> : <WalletConnectButton /> }
    </Main>
  </Box>
  )
}

export default AddConnection;