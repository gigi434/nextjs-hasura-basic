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
        { fetchPolicy: 
            'network-only'
            // 'cache-first' 最初に1回だけフェッチし、キャッシュに保存したデータだけ読み込む　バックグラウンドで頻繁に変わるデータに不向き
            // 'no-cache' キャッシュを利用せずに毎回サーバーにデータをフェッチする　キャッシュは作成されない
            // 'network-only' 毎回フェッチし、キャッシュに保存する　頻繁に変わるデータに向いている
            // 'cache-and-network' network-onlyと比べて挙動は同じだが、キャッシュがある場合は表示してフェッチ後に新しいデータで上書きする
        },
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