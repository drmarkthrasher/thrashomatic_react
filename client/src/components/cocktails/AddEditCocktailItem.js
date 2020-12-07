import React, { useState, useEffect } from 'react';

import {
  TextField,
  Card,
  CardContent,
  Slider,
  Grid,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import greencheck from '../../images/greencheck.png';
import greycheck from '../../images/greycheck.png';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  card: {
    borderColor: 'blue',
    border: '10px solid',
    borderLeft: '0',
    borderTop: '0',
    borderRight: '0',
    borderBottom: '0',
  },
});

const amounts = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 0.25,
    label: '0.25',
  },
  {
    value: 0.5,
    label: '0.5',
  },
  {
    value: 0.75,
    label: '0.75',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 1.25,
    label: '1.25',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 1.75,
    label: '1.75',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 2.25,
    label: '2.25',
  },
  {
    value: 2.5,
    label: '2.5',
  },
  {
    value: 2.75,
    label: '2.75',
  },
  {
    value: 3,
    label: '3',
  },
];

const AddEditCocktailItem = (props) => {
  const classes = useStyles();

  //props contains the single liquor in the parent list

  const [liquorChecked, setLiquorChecked] = useState(props.liquor.isChecked);
  const [liquorAmount, setLiquorAmount] = useState(1);

  var thisliquor = {
    index: props.liquor.index,
    title: props.liquor.title,
    isChecked: props.liquor.isChecked,
    amount: props.liquor.amount,
  };

  useEffect(() => {
    setLiquorChecked(props.liquor.isChecked);
    setLiquorAmount(props.liquor.amount);
  }, [props.liquor.isChecked, props.liquor.amount]);

  const callbackFunction = () => {
    //send updated single liquor props back to parent...
    props.parentCallback(thisliquor);
  };

  const toggleChecked = () => {
    thisliquor.isChecked = !liquorChecked;
    setLiquorChecked(!liquorChecked);
    callbackFunction();
  };

  return (
    <div>
      <Card className={liquorChecked ? classes.card : ''} variant='outlined'>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={8} onClick={() => toggleChecked()}>
              <Grid container>
                <img
                  src={liquorChecked ? greencheck : greycheck}
                  alt=''
                  style={{ width: 50, height: 50 }}
                />
                <h4>{props.liquor.title}</h4>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                disabled={liquorChecked ? false : true}
                value={liquorAmount}
                variant='outlined'
                size='small'
                margin='normal'
                fullWidth
                label='Shots'
                onChange={(e) => {
                  setLiquorAmount(e.target.value);
                  thisliquor.amount = e.target.value;
                  thisliquor.isChecked = true;
                  callbackFunction();
                }}
              >
                {amounts.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Slider
            disabled={liquorChecked ? false : true}
            value={liquorAmount}
            step={0.25}
            min={0}
            max={3}
            onChange={(e, newValue) => {
              setLiquorAmount(newValue);
              thisliquor.amount = newValue;
              thisliquor.isChecked = true;
              callbackFunction();
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEditCocktailItem;
