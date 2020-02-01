import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

const accessToken = ACCESS_TOKEN;

const authLink = setContext(async (request, previousContext) => {
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
