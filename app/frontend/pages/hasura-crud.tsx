import { VFC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER } from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import UserItem from '../components/UserItem'

const HasuraCRUD: VFC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
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
            return existingUsers.filter((user) => delete_users_by_pk.id !== readField('id', user))
          },
        },
      })
    },
  })

  // ユーザー情報更新ボタンをクリックした場合、更新されたユーザー情報を画面に表示する
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // もしユーザーIDが入力されていればユーザー更新を行い、入力されていなければユーザーを追加する
    try {
      if (editedUser.id) {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } else {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      }
      // editedUserの初期化
      setEditedUser({ id: '', name: '' })
    } catch (err) {
      alert(err.message)
    }
  }

  // もしuseQueryでエラーがある場合にエラー内容を画面に表示する
  if (error) return <Layout title='Hasura CRUD'>Error: {error.message}</Layout>

  return (
    <Layout title='Hasura CRUD'>
      <p className='mb-3 font-bold'>Hasura CRUD</p>
      <form className='flex flex-col justigy-center items-center' onSubmit={handleSubmit}>
        <input
          className='px-3 py-2 border border-gray-300'
          placeholder='New user ?'
          type='text'
          value={editedUser.name}
          onChange={(e) => {
            setEditedUser({ ...editedUser, name: e.target.value })
          }}
        />
        <button
          disabled={!editedUser.name}
          className='disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rouded-2xl focus:outline-none'
          data-testid='new'
          type='submit'
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {/* ユーザー情報の一覧を表示する */}
      {data?.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            delete_users_by_pk={delete_users_by_pk}
            setEditedUser={setEditedUser}
          />
        )
      })}
    </Layout>
  )
}

export default HasuraCRUD
