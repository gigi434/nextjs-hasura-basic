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
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      // admin-secretを設定しHasuraのエンドポイントを保護することで、コンソール外部から第三者からのAPI呼び出しを不可にする
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),

    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // For SSG and SSR always create a new Apollo Client
  // SSRとSSGなどサーバーサイドの処理を行う場合はいつもApollo Clientインスタンスを生成する必要がある
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  // CSRなどクライアントサイドの処理を行う場合は一度だけApollo Clientインスタンスを生成する
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
