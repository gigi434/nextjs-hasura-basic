import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

/**
 * ユーザー情報新規作成用フォームのカスタムフック
 */
export const useCreateForm = () => {
  // ユーザー新規登録時に入力する説明用の文章　ここではusercreateのレンダリングが行われる確認だけのため使用する
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  // ユーザー新規作成用の関数作成
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
  /**
   * ユーザー新規作成用フォーム説明のイベントハンドラ
   * @params e イベントオブジェクト
   */
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  /**
   * ユーザー新規作成用のユーザー名イベントハンドラ
   */
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])
  /**
   * Helloと表示するだけの関数
   */
  const printMsg = useCallback(() => {
    console.log('Hello')
  }, [])
  /**
   * ユーザーの新規追加を行うイベントハンドラ
   */
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await insert_users_one({
          variables: {
            name: username,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      // Submit後に初期化
      setUsername('')
    },
    // useStateの初期値が設定されるため第二引数にusernameを設定する
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username],
  )

  return {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange,
  }
}
