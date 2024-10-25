import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_KEY } from '../constants';

//Creating http link and defined the graphql endpoint
const httpLink = createHttpLink({
  uri: `${GRAPHQL_KEY}`,
});

//Creating auth link and setContext is function that helps to modify the request headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token1');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//Creating main client used to interact with graphql server
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), //mechanism to store the query results
});

export default client;
