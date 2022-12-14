import { VFC } from "react"
import Link from "next/link"
import { useQuery } from "@apollo/client"
import { GET_USERS, GET_USERS_LOCAL } from "../queries/queries"
import { GetUsersQuery } from "../types/generated/graphql"
import { Layout } from "../components/Layout"

const FetchSub: VFC = () => {
    // useQueryにはフェッチポリシーがあり、指定がなければcache-first（キャッシュがあれば見に行く）設定になる。
    // キャッシュがない場合サーバーにクエリを投げることはしない
    const { data } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)
    return (
        <Layout title="Hasura fetchPolicy read cache">
            <p className="mb-6 font-bold">Direct read out from cache</p>
            {data?.users.map((user) => {
                return (
                    <p className="my-1" key={user.id}>
                        {user.name}
                    </p>
                )
            })}
            <Link href="/hasura-main" passHref>
                <a className="mt-6">Back</a>
            </Link>
        </Layout>
    )
}

export default FetchSub