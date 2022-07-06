import '../styles/globals.css'

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Navbar from '../components/Navbar';
import { AuthProvider } from '../lib/auth.js'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
/*
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navbar/>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}*/

export default MyApp 
