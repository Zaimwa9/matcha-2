import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getOperationAST } from 'graphql';

const link = ApolloLink.split(
  operation => {
    const operationAST = getOperationAST(operation.query, operation.operationName);
    return !!operationAST && operationAST.operation === 'subscription';
  },
  new WebSocketLink({
    uri: 'ws://localhost:3000/subscriptions',
    options: {
      reconnect: true, //auto-reconnect
      // // carry login state (should use secure websockets (wss) when using this)
      // connectionParams: {
      //   authToken: localStorage.getItem("Meteor.loginToken")
      // }
    }
  }),
  new HttpLink({ uri: 'http://localhost:3000/graphql' })
);

const cache = new InMemoryCache(window.__APOLLO_STATE);

const client = new ApolloClient({
  link,
  cache
});

export default client;
