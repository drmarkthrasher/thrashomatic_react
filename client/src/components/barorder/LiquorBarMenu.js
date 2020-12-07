import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Button } from '@material-ui/core';

import GET_LIQUORS from '../../apollo/liquors/queries/getLiquors';
import LiquorBarMenuItem from './LiquorBarMenuItem';

const LiquorBarMenu = (props) => {
  const [barLiquors, setBarLiquors] = useState([]);
  const [modLiquors, setModLiquors] = useState([]);

  const { data, loading, error } = useQuery(GET_LIQUORS, {
    onCompleted(data) {
      let unsortedLiquors = data.liquors.map((item) => item);
      let sortedList = unsortedLiquors.sort((a, b) => a.index - b.index);
      setBarLiquors(sortedList);
      setModLiquors(sortedList);
    },
  });

  //

  const prepareSubmit = () => {
    props.history.push({
      pathname: '/liquorbarordersummary',
      state: { liquors: modLiquors },
    });
  };

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

  return (
    <div>
      <p>need to add margin here to account for header</p>
      <Link to='/'>Home</Link>
      <h3>Liquor Bar</h3>

      {barLiquors.map((liquor, index) => {
        return (
          <LiquorBarMenuItem
            key={liquor.index}
            liquor={liquor}
            parentCallback={callbackFunction}
          />
        );
      })}
      <Button
        onClick={() => {
          prepareSubmit();
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default LiquorBarMenu;
