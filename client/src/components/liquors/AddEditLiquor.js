import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';

import {
  Button,
  List,
  ListItem,
  TextField,
  Grid,
  Divider,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from '@material-ui/core';

import ADD_LIQUOR from '../../apollo/liquors/mutations/addLiquor';
import GET_LIQUORS from '../../apollo/liquors/queries/getLiquors';
import EDIT_LIQUOR from '../../apollo/liquors/mutations/editLiquor';

const AddEditLiquor = (props) => {
  const id = props.match.params.id;
  const [liquors, setLiquors] = useState([]);

  // const [addLiquorServer] = useMutation(ADD_LIQUOR, {
  //   onError(err) {
  //     console.log(err);
  //   },
  //   update(cache, { data }) {
  //     //this updates cache with the new entry
  //   },
  //   onCompleted(data) {
  //     console.log('Add mutation has completed');
  //   },
  // });

  useEffect(() => {}, []);

  const [saveLiquors] = useMutation(EDIT_LIQUOR, {
    onError(err) {
      console.log(err);
    },
    update(cache, { data }) {
      // For 'edit', apollo handles this automatically as long as id is returned
      // in this mutation, I am returning array of liquors, so update is automatic.
    },
    onCompleted(data) {
      // editCocktail(data.editCocktail); // for context api
      props.history.push('/cocktails');
    },
  });

  const prepareForEdit = (liquors) => {
    // need to strip liquors __typename (not 100% sure)
    // I think Apollo wants the array to be immutable.
    var rebuildLiquors = [];
    liquors.map((obj) => {
      rebuildLiquors.push({
        id: obj.id,
        index: obj.index,
        title: obj.title,
        isChecked: obj.isChecked,
        amount: obj.amount,
        isAvailable: obj.isAvailable,
        type: obj.type,
      });
    });

    saveLiquors({
      variables: {
        liquors: rebuildLiquors,
      },
    });
  };

  const { data, error, loading } = useQuery(GET_LIQUORS, {
    update(cache, { data }) {
      console.log(data);
    },
    onCompleted(data) {
      // var newarray = JSON.parse(JSON.stringify(data.liquors));
      // setLiquors(newarray);

      // this is another way to prevent the read only error
      setLiquors(data.liquors.map((item) => item));
    },
  });

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error! {error.message}</div>;

  const updateTitle = (newtitle, index) => {
    // to prevent error of changing field of read only, do this...
    // var newarray = JSON.parse(JSON.stringify(liquors));
    // let objIndex = newarray.findIndex((obj) => obj.index == index);
    // newarray[objIndex].title = newtitle;
    // setLiquors(newarray);

    // this way prevents the error of changing read only field also
    setLiquors(
      liquors.map((item) =>
        item.index === index ? { ...item, title: newtitle } : item
      )
    );
  };

  const updateIsAvailable = (newvalue, index) => {
    setLiquors(
      liquors.map((item) =>
        item.index === index ? { ...item, isAvailable: newvalue } : item
      )
    );
  };

  const updateType = (newvalue, index) => {
    setLiquors(
      liquors.map((item) =>
        item.index === index ? { ...item, type: newvalue } : item
      )
    );
  };

  // create list of liquors as 'Items'
  var Items = [];
  if (liquors) {
    // this sorts the array by index
    let sortedlist = liquors.sort((a, b) => a.index - b.index);

    Items = sortedlist.map((liquor, index) => {
      return (
        <div key={liquor.id}>
          <ListItem key={liquor.id}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <h3>Station: {liquor.index}</h3>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={liquor.isAvailable}
                      onChange={(e) =>
                        updateIsAvailable(e.target.checked, liquor.index)
                      }
                      name='checkedB'
                      color='primary'
                    />
                  }
                  label='Available'
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={liquor.type}
                    onChange={(e) => updateType(e.target.value, liquor.index)}
                  >
                    <MenuItem value={'Bourbon'}>Bourbon</MenuItem>
                    <MenuItem value={'Scotch'}>Scotch</MenuItem>
                    <MenuItem value={'Vodka'}>Vodka</MenuItem>
                    <MenuItem value={'Tequila'}>Tequila</MenuItem>
                    <MenuItem value={'Gin'}>Gin</MenuItem>
                    <MenuItem value={'Triple Sec'}>Triple Sec</MenuItem>
                    <MenuItem value={'Whiskey'}>Whiskey</MenuItem>
                    <MenuItem value={'Rum'}>Rum</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='text'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Title'
                  onChange={(e) => updateTitle(e.target.value, liquor.index)}
                  value={liquor.title}
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );
    });
  }

  return (
    <div>
      <h3>Liquor List</h3>
      <Link to='/'>Back to Home</Link>
      <p></p>
      <List>{Items}</List>
      <Button onClick={() => prepareForEdit(liquors)}>Save</Button>
    </div>
  );

  // I used the code below when I was creating the liquors by form.
  // I now realize the best way is to add them directly from MongoDB Atlas

  // return (
  //   <div>

  //       <h3>Add/Edit Liquors</h3>
  //     <Link to='/'>Go Back Home</Link>
  //     <p></p>

  //     <TextField
  //       type='number'
  //       variant='outlined'
  //       margin='normal'
  //       required
  //       fullWidth
  //       label='Liquor Index'
  //       onChange={(e) => setIndex(e.target.value)}
  //       value={index}
  //     />
  //     <p></p>
  //     <TextField
  //       type='text'
  //       variant='outlined'
  //       margin='normal'
  //       required
  //       fullWidth
  //       label='Title'
  //       onChange={(e) => setTitle(e.target.value)}
  //       value={title}
  //     />
  //     <p></p>
  //     <TextField
  //       type='boolean'
  //       variant='outlined'
  //       margin='normal'
  //       required
  //       fullWidth
  //       label='isChecked'
  //       onChange={(e) => setIsChecked(e.target.value)}
  //       value={isChecked}
  //     />
  //     <p></p>
  //     <TextField
  //       type='number'
  //       variant='outlined'
  //       margin='normal'
  //       required
  //       fullWidth
  //       label='amount'
  //       onChange={(e) => setAmount(e.target.value)}
  //       value={amount}
  //     />
  //     <p></p>
  //     <TextField
  //       type='text'
  //       variant='outlined'
  //       margin='normal'
  //       required
  //       fullWidth
  //       label='isAvailable'
  //       onChange={(e) => setIsAvailable(e.target.value)}
  //       value={isAvailable}
  //     />
  //     <p></p>
  //     <TextField
  //       type='text'
  //       variant='outlined'
  //       margin='normal'
  //       required
  //       fullWidth
  //       label='Type'
  //       onChange={(e) => setType(e.target.value)}
  //       value={type}
  //     />
  //     <p></p>

  //     <Button
  //       variant='contained'
  //       color='primary'
  //       onClick={() =>
  //         addLiquorServer({
  //           variables: {
  //             index: index,
  //             title: title,
  //             isChecked: isChecked,
  //             amount: amount,
  //             isAvailable: isAvailable,
  //             type: type,
  //           },
  //         })
  //       }
  //     >
  //       Create
  //     </Button>
  //   </div>
  // );
};

export default AddEditLiquor;
