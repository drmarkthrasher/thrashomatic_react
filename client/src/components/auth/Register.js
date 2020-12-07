import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, TextField, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import REGISTER from '../../apollo/auth/mutations/register';

import './Register.css';

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

const Register = (props) => {
  const classes = useStyles();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, []);

  const [registerUser] = useMutation(REGISTER, {
    onError(err) {
      console.log(err);
    },
  });

  return (
    <div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h4>REGISTER</h4>
      </div>
      <p />
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='First Name'
              autoFocus
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Last Name'
              onChange={(e) => setLastname(e.target.value)}
            />
          </Grid>
        </Grid>
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
              registerUser({
                variables: { firstname, lastname, email, password },
              })
            }
          >
            Register
          </Button>
        </Grid>

        <p />
        <div style={{ marginTop: 20 }}>
          <Link to='/login'>Already have an account? Sign in</Link>
        </div>
      </Grid>
    </div>
  );
};

export default Register;
