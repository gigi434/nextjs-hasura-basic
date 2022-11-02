import { ChangeEvent, FormEvent, memo, VFC } from 'react'

interface ChildProps {
  printMsg: () => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

// eslint-disable-next-line react/display-name
const Child: VFC<ChildProps> = memo(({ printMsg, handleSubmit }) => {
  return (
    <>
      {console.log('Child rendered')}
      <p>Child Component</p>
      {/* クリックされた場合にprintMsgが発火する */}
      <button
        className='my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none'
        onClick={printMsg}
      >
        click
      </button>
    </>
  )
})

export default Child
