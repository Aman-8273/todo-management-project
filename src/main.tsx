import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'https://b321-2409-40c1-5023-badb-a914-fd50-5db2-d65c.ngrok-free.app/graphql',
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: 'https://graphqlapi.com/',
//   cache: new InMemoryCache(),
// });

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='34032634943-ggqgo7un4go1g8huoi80o3l13r3sm12j.apps.googleusercontent.com'>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// import ReactDOM from 'react-dom/client';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import App from './App';

// // Create the Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql', // GraphQL server endpoint
//   cache: new InMemoryCache(),
// });

// // Wrap the app with ApolloProvider
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLInputElement
// );
// root.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );
