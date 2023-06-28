import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { AppContext } from '../../context/Context';
import './Header.scss';
import fetchLogout from '../../fetch/fetchLogout';

const drawerWidth = 240;

const Header = () => {
  const context = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    fetchLogout()
      .then((result) => {
        if (result) {
          context.setAuthenticated(false);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BeeJee
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link className="link link-mobile" to={'/'}>
              <ListItemText primary={'Home'} />
            </Link>
          </ListItemButton>
        </ListItem>

        {context.authenticated ? (
          <ListItem disablePadding onClick={logout}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link className="link link-mobile" to={'/login'}>
                <ListItemText primary={'Logout'} />
              </Link>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link className="link link-mobile" to={'/login'}>
                <ListItemText primary={'Login'} />
              </Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box className="header" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BeeJee
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button>
              <Link className="link" to={'/'}>
                Home
              </Link>
            </Button>
            {context.authenticated ? (
              <Button onClick={logout}>
                <Link className="link" to={'/login'}>
                  Logout
                </Link>
              </Button>
            ) : (
              <Button>
                <Link className="link" to={'login'}>
                  Login
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
