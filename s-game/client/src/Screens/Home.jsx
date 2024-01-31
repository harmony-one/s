import React from 'react'
import { Typography, TextField, Box } from '@mui/material';
import { Navbar } from '../Components';
import { styled } from '@mui/material/styles';

const Home = () => {
  const drawerWidth = 240;

  const [open, setOpen] = React.useState(true);
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
    <Navbar open={open} setOpen={setOpen} pageTitle="Home" />
    <Main open={open}>
      <DrawerHeader />
      <Typography>Establish Connection</Typography>
      <TextField id="outlined-basic" label="Friend's OTP" variant="outlined" type="tel"/>
    </Main>
  </Box>
  )
}

export default Home