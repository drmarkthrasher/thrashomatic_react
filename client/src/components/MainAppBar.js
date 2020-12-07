import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import BluetoothConnectedIcon from '@material-ui/icons/BluetoothConnected';

import { LoopCircleLoading } from 'react-loadingg';

import { GlobalContext } from '../context/GlobalState';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const MainAppBar = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const {
    setIsAuthenticated,
    setBluetoothDevice,
    setBluetoothServer,
    setBluetoothService,
  } = useContext(GlobalContext);

  let [open, setOpen] = useState(false);
  let [waiting, setWaiting] = useState(false);

  useEffect(() => {}, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setOpen(false);
    history.push('/login');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const connect = async () => {
    setOpen(false);
    navigator.bluetooth
      ? console.log('Available')
      : console.log('Not Available');

    let options = {
      acceptAllDevices: true,
      //use android app 'lightblue' to get this data... ('1101' part was specified in arduino)
      optionalServices: ['00001101-0000-1000-8000-00805f9b34fb'],
    };

    try {
      setWaiting(true);
      let device = await navigator.bluetooth.requestDevice(options);
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        '00001101-0000-1000-8000-00805f9b34fb'
      );
      setBluetoothDevice(device);
      setBluetoothServer(server);
      setBluetoothService(service);
      setWaiting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      {waiting ? <LoopCircleLoading /> : null}

      <AppBar position='static' position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Thrashomatic
          </Typography>
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={open}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => connect()}>
            <ListItemIcon>
              <BluetoothConnectedIcon />
            </ListItemIcon>
            <ListItemText primary='Connect' />
          </ListItem>
          <ListItem button onClick={() => logout()}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default MainAppBar;
