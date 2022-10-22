import { makeVar } from '@apollo/client'

// 複数のタスクを管理する状態管理を作成する

interface Task {
    /**
     * タスクの名前
     */
    title: string,
}

// Apollo Clientキャッシュ外のローカル状態を管理する変数を宣言する。この変数のことをリアクティブ変数と呼ぶ。
export const todoVar = makeVar<Task[]>([])