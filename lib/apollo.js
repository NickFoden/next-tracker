import ApolloClient from "apollo-boost";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";

export function withApollo(PageComponent) {
  const WithAppollo = props => {
    const client = initApolloClient();

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
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

const initApolloClient = () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    fetch
  });
  return client;
};
