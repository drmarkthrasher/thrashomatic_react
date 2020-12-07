import React from 'react';
import { Link } from 'react-router-dom';

import LocalBarIcon from '@material-ui/icons/LocalBar';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  largeIcon: {
    width: 100,
    height: 100,
  },
};

const Home = () => {
  const dummy_id = '123456';

  return (
    <div>
      <h2>Home Page</h2>
      <Link to='/cocktails'>Cocktail List</Link>
      <p></p>
      <Link to='/addcocktail'>Add New Cocktail </Link>
      <p></p>
      <Link to='/addliquor'>Edit Bar Manager</Link>
      <p></p>
      <Link to={{ pathname: `/editcocktail/${dummy_id}` }}>Edit Cocktail </Link>
      <p></p>
      <Link to='/liquorbarmenu'>Order from Bar </Link>
      <p></p>
      <Link to='/cocktails'>
        <IconButton>
          Cocktails
          <LocalBarIcon style={styles.largeIcon} />
        </IconButton>
      </Link>
    </div>
  );
};

export default Home;
