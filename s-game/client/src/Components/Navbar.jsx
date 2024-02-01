import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Drawer, CssBaseline, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Groups2Icon from '@mui/icons-material/Groups2';

import logo from '../assets/Harmony-logo-WH.svg';


const Navbar = ({ pageTitle, open, setOpen }) => {
  const drawerWidth = 248;

  const navigate = useNavigate();

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            {/* <Typography variant="h5" noWrap component="div">
                {pageTitle}
            </Typography> */}
            <Box sx={{ mr: 2.5 }}>
              <a href="/">
                <img src={logo} alt="logo" width={113} height={48} />
              </a>
            </Box>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            PaperProps={{
              sx: {
                backgroundColor: "#63b7db",
                color: "#424242",
              }
            }}
        >
            <DrawerHeader>
            <Box sx={{ mr: 2.5 }}>
              <a href="/">
                <img src={logo} alt="logo" width={113} height={48} />
              </a>
            </Box>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {navigate("/");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <HandshakeIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Connect" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {navigate("/socialbond");}}>
                    <ListItemButton>
                    <ListItemIcon>
                        <Groups2Icon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Social Bond" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </div>
  )
};

export default Navbar;