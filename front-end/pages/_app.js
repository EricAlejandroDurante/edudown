import '../styles/globals.css'

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Navbar from './navbar';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navbar/>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp 
