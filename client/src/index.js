import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setContext } from 'apollo-link-context';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client"

// const client=new ApolloClient({
//   uri: 'http://localhost:4000',
//   cache: new InMemoryCache(),
  
//   headers:{
//      authorization:localStorage.getItem('token') || ""
//   }
//     })

const authLink = setContext((_, { headers }) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  // Return the headers with the token added
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});
  
    
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
