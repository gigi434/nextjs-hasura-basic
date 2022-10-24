// HasuraとNext.jsを連携するモジュールを作成する

import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => {
    return new ApolloClient({
        // Server Sideで実行されてない場合True
        ssrMode: typeof window === 'undefined',
        // Hasuraの単一エンドポイント
        link: new HttpLink({
            uri: 'https://knowing-terrier-72.hasura.app/v1/graphql',
        }),

        cache: new InMemoryCache(),
    })
}

export const initializeApollo = (initialState = null) => {
    const _apolloClient = apolloClient ?? createApolloClient()

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}