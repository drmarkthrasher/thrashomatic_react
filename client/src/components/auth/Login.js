import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

import LOGIN from '../../apollo/auth/mutations/login';
import { GlobalContext } from '../../context/GlobalState';

import './Login.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthenticated } = useContext(GlobalContext);

  useEffect(() => {}, []);

  const [login] = useMutation(LOGIN, {
    onError(err) {
      console.log(err);
    },
    update(cache, { data }) {
      localStorage.setItem('token', data.login.token);
      setIsAuthenticated(true);
      props.history.push('/');
    },
  });

  return (
    <div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h4>LOGIN USER</h4>
      </div>
      <p />
      <form noValidate>
        <TextField
          type='email'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type='password'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <p />
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={() =>
              login({
                variables: { email, password },
              })
            }
          >
            Login
          </Button>
        </Grid>
        <div style={{ marginTop: 20 }}>
          <Link to='/register'>Don't have an account? Register</Link>
        </div>
      </Grid>
    </div>
  );
};

export default Login;
