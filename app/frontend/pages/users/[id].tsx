import { VFC } from 'react'
import Link from 'next/link'
import {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { initializeApollo } from '../../lib/apolloClient'
import { GET_USERIDS, GET_USERBY_ID } from '../../queries/queries'
import {
  GetUserByIdQuery,
  GetUserIDsQuery,
  Users,
} from '../../types/generated/graphql'

import { Layout } from '../../components/Layout'

type UserDetailProps = {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
}

const UserDetail: VFC<UserDetailProps> = ({ user }) => {
  if (!user) {
    return <Layout title='loading'>Loading...</Layout>
  }

  return (
    <Layout title={user.name}>
      <p className='text-xl font-bold'>User-detail</p>
      <p className='m-4'>
        {'ID: '}
        {user.id}
      </p>
      <p className='mb-4 text-xl font-bold'>{user.name}</p>
      <p className='mb-12'>{user.created_at}</p>

      {/* mainページへのリンク */}
      <Link href='/hasura-ssg'>
        <ChevronDoubleLeftIcon
          data-testid='auth-to-main'
          className='h-5 w-5 mr-3 text-blue-500'
        />
        <span date-testid='back-to-main'>Back to main-ssg-page</span>
      </Link>
    </Layout>
  )
}

// 事前生成するページのパス（URL のパラメータ部分）のリストを返します。
// 例) users/001.tsx の001の部分
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  // 全てのユーザー情報のIDを取得する
  const { data } = await apolloClient.query<GetUserIDsQuery>({
    query: GET_USERIDS,
  })

  const paths = data.users.map((user) => `/users/${user.id}`)

  return {
    paths,
    fallback: true,
  }
}

// ユーザーごとに表示するのに必要な関数コンポーネントの引数を作成する
export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()
  // ユーザーIDからユーザー情報を取得する
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params.id },
  })
  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 3,
  }
}

export default UserDetail
