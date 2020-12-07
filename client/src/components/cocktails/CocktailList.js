import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { Button, List, ListItem, ListItemIcon, Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import GET_COCKTAILS from '../../apollo/cocktails/queries/getCocktails';
import DELETE_COCKTAIL from '../../apollo/cocktails/mutations/deleteCocktail';

const CocktailList = (props) => {
  const [deleteCocktailServer] = useMutation(DELETE_COCKTAIL, {
    onError(err) {
      console.log(err);
    },
    // update is callback for updating cache
    update(cache, { data }) {
      console.log(data);
      const existingcocktails = cache.readQuery({ query: GET_COCKTAILS });
      const updatedCocktails = existingcocktails.cocktails.filter(
        (cocktail) => cocktail.id !== data.deleteCocktail.id
      );
      cache.writeQuery({
        query: GET_COCKTAILS,
        data: {
          cocktails: updatedCocktails,
        },
      });
    },
    // onCompleted is called when mutation is complete
    onCompleted({ data }) {
      console.log('Deletion from server completed');
    },
  });

  const handleDelete = (id) => {
    // delete from server
    deleteCocktailServer({
      variables: {
        id: id,
      },
    });
    // delete from context api
    // deleteCocktail(id);
  };

  const { data, error, loading } = useQuery(GET_COCKTAILS, {
    update(cache, { data }) {
      console.log(data);
    },
    // callback after completed
    onCompleted(data) {
      // setCocktails(data.cocktails); // Context API
    },
  });

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error! {error.message}</div>;

  // cocktails comes from context api

  let Items = [];
  if (data.cocktails) {
    Items = data.cocktails.map((cocktail, index) => {
      return (
        <ListItem key={cocktail.id}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid
              item
              onClick={() => {
                props.history.push(`/cocktailsummarysubmit/${cocktail.id}`);
              }}
            >
              {cocktail.name}
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Button
                    onClick={() => {
                      props.history.push(`/editcocktail/${cocktail.id}`);
                    }}
                  >
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => handleDelete(cocktail.id)}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <h3>Cocktail List</h3>
      <Link to='/'>Back to Home</Link>
      <p></p>
      <Fab
        color='primary'
        onClick={() => {
          props.history.push('/addcocktail');
        }}
      >
        <AddIcon />
      </Fab>

      <List>{Items}</List>
    </div>
  );
};

export default CocktailList;
