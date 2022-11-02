import { VFC } from 'react'
import { useCreateForm } from '../hooks/useCreateForm'
import Child from './Child'

const CreateUser: VFC = () => {
  const {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange,
  } = useCreateForm()

  return (
    <>
      {console.log('CreateUser rendered')}
      <p className='mb-3 font-bold'>Custom Hook + useCallback + useMemo</p>
      {/* ユーザー作成フォーム */}
      <div className='mb-3 flex flex-col justify-center items-center'>
        <label>Text</label>
        <input
          className='px-3 py-2 border border-gray-300'
          type='text'
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <form
        className='flex flex-col justify-center items-center'
        onSubmit={handleSubmit}
      >
        {/* ユーザー名入力要素 */}
        <label>Username</label>
        <input
          className='mb-3 px-3 py-2 border border-gray-300'
          placeholder='New user ?'
          type='text'
          value={username}
          onChange={usernameChange}
        />
        {/* ユーザー作成ボタン */}
        <button
          className='my-3 py-3 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rouded-2xl focus:outline-none'
          type='submit'
        >
          Submit
        </button>
      </form>
      <Child printMsg={printMsg} handleSubmit={handleSubmit} />
    </>
  )
}

export default CreateUser
