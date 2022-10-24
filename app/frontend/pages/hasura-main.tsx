// Hasuraにクエリを送り、ユーザー情報取得を行う
import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

// Apollo ClientのuseQuery関数を使用することによりGraphQLクエリを利用し、GraphQLサーバーからユーザーデータを取得する
// キャッシュ機能は使用していない
const FetchMain: VFC = () => {
    // フェッチポリシーをnetwork-onlyにすることで、hasura-subと比較して明示的にGraphQLサーバーからユーザー情報をフェッチする
    const { data, error } = useQuery<GetUsersQuery>(
        GET_USERS, 
        { fetchPolicy: 'network-only' },
    )

    if (error) {
        return (
            <Layout title="Hasura fetchPolicy">
                <p>Error: {error.message}</p>
            </Layout>
        )
    }

    return (
        <Layout title='Hasura fetchPolicy'>
            {console.log(data)}
            <p className='mb-6 font-bold'>Hasura main page</p>
            {data?.users.map((user) => {
                return (
                    <p className='my-1' key={user.id}>
                        {user.name}
                    </p>
                )
            })}
            <Link href="/hasura-sub" passHref>
                <a className='mt-6'>Next</a>
            </Link>
        </Layout>
    )
}

export default FetchMain