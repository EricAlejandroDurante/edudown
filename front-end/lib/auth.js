import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:3001/graphql',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }

  const signIn = async ({ email, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
    mutation signin($email: String, $password: String) {
      loginUser(email: $email, password: $password) {
        token
      }
    }
      #mutation signin($username: String!, $password: String!) {
      #  login(username: $username, password: $password) {
      #    token
      #  }
      #}
    `

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { email, password },
    })

    console.log(result)

    if (result?.data?.loginUser?.token) {
      setAuthToken(result.data.loginUser.token)
    }
  }

  const signOut = () => {
    setAuthToken(null)
  }

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  }
}

