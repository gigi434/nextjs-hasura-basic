import { ReactNode, VFC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

interface LayoutProps {
  /**
   * 表示する他の関数コンポーネント
   */
  children: ReactNode
  /**
   * 動的にタブの表示を変更する変数
   */
  title: string
}

export const Layout: VFC<LayoutProps> = ({ children, title = 'Welcome to Next.js!' }) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono'>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className='bg-gray-600 w-screen'>
          <div className='flex items-center pl-8 h-14'>
            <div className='flex space-x-4'>
              <Link href='/' passHref>
                <a
                  data-testid='home-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rouded'
                >
                  Home
                </a>
              </Link>
              {/* Apollo ClientのLocal Stateという機能があり、そのページへ飛ぶためのリング */}
              <Link href={'/local-state-a'}>
                <a
                  data-testid='makevar-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rouded'
                >
                  makeVar
                </a>
              </Link>
              {/* Apollo Clientのフェッチポリシー確認用リング */}
              <Link href='/hasura-main'>
                <a
                  data-testid='fetchpolicy-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
                >
                  fetchPolicy(hasura)
                </a>
              </Link>
              {/* Hasura Cloudのリンク */}
              <Link href='/hasura-crud'>
                <a
                  data-testid='crud-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rouded'
                >
                  CRUD(Hasura)
                </a>
              </Link>
              {/* HasuraとApollo Clientを利用してSSGとISRを実行するためのリンク */}
              <Link href='/hasura-ssg'>
                <a
                  data-testid='ssg-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rouded'
                >
                  SSG+ISR(Hasura)
                </a>
              </Link>
              {/* useMemoやuseCallbackを用いた関数コンポーネントのレンダリング最適化を実行するためのリンク */}
              <Link href='/hooks-memo' passHref>
                <a
                  data-testid='memo-nav'
                  className='text-gray-300 hover:bg-gray-700 px-3 py-2 rouded'
                >
                  custom hook + memo
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* 渡された関数コンポーネントを表示する */}
      <main className='flex flex-1 flex-col justify-center items-center w-screen'>{children}</main>
      {/* Next.jsにデフォルトで表示されるフッター */}
      <footer className='w-full h-12 flex justify-center items-center border-t'>
        <a
          className='flex items-center'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}
