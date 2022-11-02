/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
// testing-libraryのカスタムマッチャー
import '@testing-library/jest-dom/extend-expect'
// クリックするイベントを起こすための関数
import userEvent from '@testing-library/user-event'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'

// 最初に初期化する必要があるため実行する
initTestHelpers()

// setupServerを定義してモックサーバーを用意する
// mock service worksはブラウザからのリクエストを横取りして任意のレスポンスを返すライブラリのこと
// これにより、ExpressなどのAPサーバーをテストのために作成する必要がなくなる。
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})
// それぞれのテスト終了ごとに処理を実行
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
// 全てのテスト終了後に処理を実行
afterAll(() => {
  server.close()
})

describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/',
    })
    render(page)
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('makevar-nav'))
    expect(await screen.findByText('makeVar')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('fetchpolicy-nav'))
    expect(await screen.findByText('Hasura main page')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('crud-nav'))
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('ssg-nav'))
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('memo-nav'))
    expect(
      await screen.findByText('Custom Hook + useCallback + useMemo'),
    ).toBeInTheDocument()
    userEvent.click(screen.getByTestId('home-nav'))
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
  })
})
