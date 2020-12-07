import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import { GlobalProvider } from './context/GlobalState';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache({ addTypename: true }),
  headers: {
    Authorization: `${localStorage.getItem('token')}`,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
