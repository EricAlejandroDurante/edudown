import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getSession, signOut } from 'next-auth/react'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql'
})

const authLink = setContext(async (_, { headers }) => {
  const { accessToken } = await getSession()
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    if (networkError.statusCode === 401) {
      signOut({ redirect: false })
    }
  }
})

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),//cleinte que tu ocupas para conectarte a graphql
  cache: new InMemoryCache()
})

export default client
