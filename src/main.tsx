import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import App from './App';
import { GOOGLE_KEY, GRAPHQL_KEY } from './keys';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: GRAPHQL_KEY!,
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_KEY!}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
