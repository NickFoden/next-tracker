import ApolloClient from "apollo-boost";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import { InMemoryCache } from "apollo-cache-inmemory";

export function withApollo(PageComponent) {
  const WithAppollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  WithAppollo.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }
    //if on server
    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }
      try {
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }
      Head.rewind();
    }
    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState
    };
  };

  return WithAppollo;
}

const isDev = process.env.NODE_ENV !== "production";
const url = isDev
  ? "http://localhost:3000"
  : "https://next-tracker.nickfoden.now.sh";

const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    uri: `${url}/api/graphql`,
    fetch,
    cache
  });
  return client;
};
