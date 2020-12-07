import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
// import { GlobalContext } from '../../context/GlobalState';

import { Button, TextField } from '@material-ui/core';

import AddEditCocktailItem from './AddEditCocktailItem';
import ADD_COCKTAIL from '../../apollo/cocktails/mutations/addCocktail';
import GET_COCKTAIL from '../../apollo/cocktails/queries/getCocktail';
import EDIT_COCKTAIL from '../../apollo/cocktails/mutations/editCocktail';
import GET_COCKTAILS from '../../apollo/cocktails/queries/getCocktails';
import GET_LIQUORS from '../../apollo/liquors/queries/getLiquors';

const AddEditCocktail = (props) => {
  // const { cocktails, addCocktail, editCocktail } = useContext(GlobalContext);

  // Master list of alcohols (I will eventually make this dynamic in the app)
  let myliquors = [
    {
      index: 0,
      title: 'Bourbon',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 1,
      title: 'Scotch',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 2,
      title: 'Vodka',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 3,
      title: 'Tequila',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 4,
      title: 'Gin',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 5,
      title: 'Triple Sec',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 6,
      title: 'Whiskey',
      isChecked: false,
      amount: 1.0,
    },
    {
      index: 7,
      title: 'Rum',
      isChecked: false,
      amount: 1.0,
    },
  ];

  const id = props.match.params.id;
  const [cocktailName, setCocktailName] = useState('');
  const [otherIngredients, setOtherIngredients] = useState('');
  const [liquors, setLiquors] = useState([]);
  const [modLiquors, setModLiquors] = useState([]);

  // get master list of liquors (use dataR so it won't clash with other query)
  const { data: dataR } = useQuery(GET_LIQUORS, {
    onCompleted(data) {
      console.log(data.liquors);
      // myliquors = data.liquors;
    },
  });

  const { data } = useQuery(GET_COCKTAIL, {
    variables: { id: id },
    skip: !id,
    onCompleted(data) {
      // setCocktails(data.cocktails); // Context API
      setCocktailName(data.getCocktail.name);
      setLiquors(data.getCocktail.liquors);
      setOtherIngredients(data.getCocktail.otherIngredients);
      setModLiquors(data.getCocktail.liquors);
    },
  });

  useEffect(() => {
    //for case of adding new cocktail
    if (!id) {
      // sets to basic master list defaults
      setLiquors(myliquors);
      setModLiquors(myliquors);
    }
  }, []);

  var callbackFunction = async (childData) => {
    await setModLiquors(
      [...modLiquors].map((object) => {
        if (object.index === childData.index) {
          return {
            ...object,
            // title: childData.title,
            isChecked: childData.isChecked,
            amount: childData.amount,
          };
        } else {
          return {
            ...object,
          };
        }
      })
    );
  };

  const [addCocktailServer] = useMutation(ADD_COCKTAIL, {
    onError(err) {
      console.log(err);
    },
    update(cache, { data }) {
      //this updates cache with the new entry
      var existingcocktails = cache.readQuery({ query: GET_COCKTAILS });
      var newCocktails = {
        cocktails: [...existingcocktails.cocktails, data.addCocktail],
      };
      cache.writeQuery({
        query: GET_COCKTAILS,
        data: { cocktails: newCocktails },
      });
    },
    onCompleted(data) {
      console.log('Add mutation has completed');
      // addCocktail(data.addCocktail);  // for context api
      props.history.push('/cocktails');
    },
  });

  const [editCocktailServer] = useMutation(EDIT_COCKTAIL, {
    onError(err) {
      console.log(err);
    },
    update(cache, { data }) {
      // For 'edit', apollo handles this automatically as long as id is returned
    },
    onCompleted(data) {
      // editCocktail(data.editCocktail); // for context api
      props.history.push('/cocktails');
    },
  });

  const prepareForEdit = (id, cocktailName, otherIngredients, modLiquors) => {
    // need to strip liquors __typename (not 100% sure)
    // I think the call to getCocktail causes it to be tagged as 'Liquors'
    // The edit needs it to be 'Liquor'.  Therefore, I am just stripping it out
    // completely.
    var rebuildLiquors = [];
    modLiquors.map((obj) => {
      rebuildLiquors.push({
        index: obj.index,
        title: obj.title,
        isChecked: obj.isChecked,
        amount: obj.amount,
      });
    });

    editCocktailServer({
      variables: {
        id: id,
        name: cocktailName,
        otherIngredients: otherIngredients,
        liquors: rebuildLiquors,
      },
    });
  };

  return (
    <div>
      <h3>Add/Edit cocktails</h3>
      <Link to='/'>Go Back Home</Link>
      <p></p>
      <Link to='/cocktails'>Back to list</Link>
      <p></p>
      <TextField
        type='text'
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Cocktail Name'
        onChange={(e) => setCocktailName(e.target.value)}
        value={cocktailName}
      />
      <p></p>
      {liquors.map((liquor, index) => {
        return (
          <AddEditCocktailItem
            key={liquor.index}
            liquor={liquor}
            parentCallback={callbackFunction}
          />
        );
      })}
      <p></p>
      <TextField
        type='text'
        variant='outlined'
        margin='normal'
        fullWidth
        multiline
        label='Other Ingredients'
        onChange={(e) => setOtherIngredients(e.target.value)}
        value={otherIngredients}
      />
      <p></p>
      {id ? (
        <Button
          variant='contained'
          color='primary'
          onClick={() =>
            prepareForEdit(id, cocktailName, otherIngredients, modLiquors)
          }
          //   editCocktailServer({
          //     variables: {
          //       id: id,
          //       name: cocktailName,
          //       otherIngredients: otherIngredients,
          //       liquors: modLiquors,
          //       // liquors: modLiquors,
          //     },
          //   })
          // }
        >
          Save
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={() =>
            addCocktailServer({
              variables: {
                name: cocktailName,
                otherIngredients: otherIngredients,
                // liquors: JSON.parse(JSON.stringify(liquors)),
                liquors: modLiquors,
              },
            })
          }
        >
          Create
        </Button>
      )}
    </div>
  );
};

export default AddEditCocktail;
