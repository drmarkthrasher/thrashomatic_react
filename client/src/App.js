import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainAppBar from './components/MainAppBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import AddEditCocktail from './components/cocktails/AddEditCocktail';
import CocktailList from './components/cocktails/CocktailList';
import CocktailSummarySubmit from './components/cocktails/CocktailSummarySubmit';
import AddEditLiquor from './components/liquors/AddEditLiquor';
import LiquorBarMenu from './components/barorder/LiquorBarMenu';
import OrderSummarySubmit from './components/barorder/OrderSummarySubmit';

// gobal styles
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <MainAppBar />
        <Switch>
          <ProtectedRoute path='/' component={Home} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <ProtectedRoute
            path='/addcocktail'
            component={AddEditCocktail}
            exact
          />
          <ProtectedRoute
            path='/editcocktail/:id'
            component={AddEditCocktail}
            exact
          />
          <ProtectedRoute path='/cocktails' component={CocktailList} exact />
          <ProtectedRoute
            path='/cocktailsummarysubmit/:id'
            component={CocktailSummarySubmit}
            exact
          />
          <ProtectedRoute path='/addliquor' component={AddEditLiquor} exact />
          <ProtectedRoute
            path='/liquorbarmenu'
            component={LiquorBarMenu}
            exact
          />
          <ProtectedRoute
            path='/liquorbarordersummary'
            component={OrderSummarySubmit}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
