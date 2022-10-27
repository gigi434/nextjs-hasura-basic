import { VFC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
    GET_USERS,
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
} from '../queries/queries'
import {
    GetUsersQuery,
    CreateUserMutation,
    DeleteUserMutation,
    UpdateUserMutation,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const HasuraCRUD: VFC = () => {
    const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
        fetchPolicy: 'cache-and-network'
    })

    // useMutationでは更新するための関数が返り値になる
    const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)

    // データの作成と削除はキャッシュ処理を定義する必要がある。　なお、更新は自動で定義されるため記述しない
    // ユーザー情報作成
    const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
        // insert_users_oneにクエリで作成したユーザーデータが定義される
        update(cache, { data: { insert_users_one } }) {
            // 作成したユーザーのキャッシュIDを定義する　値は__typenameとidを組み合わせたものになる
            const cacheId = cache.identify(insert_users_one)
            cache.modify({
                // 更新したいフィールドを定義する
                fields: {
                    // 第一引数には既存のキャッシュが配列として渡される
                    users(existingUsers, { toReference }) {
                        // toReferenceで更新されたユーザー情報(insert_users_one)が参照できるため、配列の先頭に定義する
                        return [toReference(cacheId), ...existingUsers]
                    },
                },
            })
        },
    })

    // ユーザー情報削除
    const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
        update(cache, { data: { delete_users_by_pk } }) {
            cache.modify({
                fields: {
                    users(existingUsers, { readField }) {
                        // 削除したユーザーでないユーザーの配列オブジェクトを返す
                        return existingUsers.filter(
                            (user) => delete_users_by_pk.id !== readField('id', user)
                        )
                    },
                },
            })
        },
    })

    return (
        <Layout title='Hasura CRUD'>
            <p className='mb-3 font-bold'>Hasura CRUD</p>
        </Layout>
    )
}