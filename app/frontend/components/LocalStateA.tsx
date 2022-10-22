import { ChangeEvent, FormEvent, useState, VFC } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

export const LocalStateA: VFC = () => {
    const [input, setInput] = useState('')

    // リアクティブ変数であるtodoVarを参照する
    const todos = useReactiveVar(todoVar)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        todoVar([...todoVar(), { title: input }])
        setInput('')
    }
    return (
        <>
            <p className='mb-3 font-bold'>makeVar</p>
            {todos?.map((task, index) => {
                return (
                    <p className='mb-3 y-1' key={index}>
                        {task.title}
                    </p>
                )
            })}

            {/* 新たにタスクを追加するためのフォーム */}
            <form
                className='flex flex-col justify-center items-center'
                onSubmit={handleSubmit}
            >
                <input
                    className='mb-3 px-3 py-2 border border-gray-300'
                    placeholder='New task ?'
                    type='text'
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setInput(e.target.value)
                    }}
                />
                <button
                    className='disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rouded-2xl focus:outline-none'
                    disabled={!input}
                    type='submit'
                >
                    Add new State
                </button>
            </form>

            {/* LocalStateBページへのリンク */}
            <Link href='/local-state-b' passHref>
                <a>Next</a>
            </Link>
        </>
    )
}