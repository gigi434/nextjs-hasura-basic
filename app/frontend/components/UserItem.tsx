import { VFC, memo, Dispatch, SetStateAction } from 'react'
import { Users, DeleteUserMutationFn } from '../types/generated/graphql'

interface UserItemProps {
  /**
   * 更新または追加したいユーザー
   */
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
  /**
   * useMutationにより作成されたユーザー削除する関数オブジェクト
   * 型注釈にはgraphql-codegenにより作成された型アサーションを使用する
   */
  delete_users_by_pk: DeleteUserMutationFn
  /**
   * useStateにより作成されたユーザー情報を更新するための関数オブジェクト
   */
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string
      name: string
    }>
  >
}

// ユーザー情報ごとに更新と削除ボタンを表示する
// memo関数を使用することにより返り値の値を保持する。　なお、useCallbackは返り値の関数を保持するためmemoを使用する

// eslint-disable-next-line react/display-name
const UserItem: VFC<UserItemProps> = memo(({ user, delete_users_by_pk, setEditedUser }) => {
  console.log('UserItem rendered')
  return (
    // 受け取ったユーザー情報を表示する
    <div className='my-1'>
      <span className='mr-2'>{user.name}</span>
      <span className='mr-2'>{user.created_at}</span>
      {/* ユーザー情報更新ボタン */}
      <button
        className='mr-1 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl focus:outline-none'
        data-testid={`edit-${user.id}`}
        onClick={() => {
          setEditedUser(user)
        }}
      >
        Edit
      </button>

      {/* ユーザー情報削除ボタン */}
      <button
        className='py-1 px-3 text-white bg-pink-600 hover:bg-pink-700 rounded-2xl focus:outline-none'
        data-testid={`delete-${user.id}`}
        onClick={async () => {
          await delete_users_by_pk({
            variables: {
              id: user.id,
            },
          })
        }}
      >
        Delete
      </button>
    </div>
  )
})

export default UserItem
