import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";

export function withApollo(PageComponent) {
  const WithAppollo = props => {
    const client = new ApolloClient({
      uri: "http://localhost:3000/api/graphql",
      fetch
    });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };
  return WithAppollo;
}
