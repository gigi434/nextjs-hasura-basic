import { gql } from '@apollo/client'

export const GET_USERS = gql`
    query GetUsers {
        users(order_by: {created_at: desc}) {
            id
            name
            created_at
        }
    }
`

// @clientを記載することでGraphQLサーバーではなくクライアントのキャッシュを探しに行く
// query名がGraphQLサーバーへのフェッチと同じのため、code-genする際には一旦コメントアウト後に生成し、コメントを外す
export const GET_USERS_LOCAL = gql`
query GetUsers {
    users(order_by: {created_at: desc}) @client {
        id
        name
        created_at
    }
}
`

export const GET_USERIDS = gql`
    query GetUserIDs {
        users(order_by: {created_at: desc}) {
            id
        }
    }
`

// ユーザー情報取得
export const GET_USERBY_ID = gql`
    query GetUserByID($id: uuid!) {
        users_by_pk(id: $id) {
            id
            name
            created_at
        }
    }
`

// ユーザー情報作成
export const CREATE_USER = gql`
    mutation CreateUser($name: String!) {
        insert_users_one(object: {name: $name}) {
            created_at
            id
            name
        }
    }
`

// ユーザー情報削除
export const DELETE_USER = gql`
    mutation DeleteUser($id: uuid!) {
        delete_users_by_pk(id: $id) {
            id
            name
            created_at
        }
    }
`

// ユーザー情報更新
export const UPDATE_USER = gql`
    mutation UpdateUser($id: uuid!, $name: String!) {
        update_users_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
            id
            name
            created_at
        }
    }
`