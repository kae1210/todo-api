
# Todo API
Node.jsとMySQLを使用したToDo管理APIです。
RESTfulな設計に基づいており、タスクの作成・取得・更新・削除（CRUD）を行う機能を提供します。SwaggerによるAPIドキュメントを用意しており、認証機能も実装済みです。


## 主な機能
- ユーザー認証（JWT）
- タスクのCRUD操作
- SwaggerによるAPIドキュメント
- エラーハンドリング
- 環境変数による設定管理


## 環境構築
1. `.env` ファイルを作成し、以下のようにデータベース接続情報を設定します。
2. パッケージをインストール
    ```sh
    npm install
    ```
3. サーバーを起動
    ```sh
    npm start
    ```


## エンドポイント
| メソッド | エンドポイント       | 説明 |
|---------|----------------|------|
| GET     | `/todos`       | すべてのタスクを取得 |
| POST    | `/todos`       | 新しいタスクを追加 |
| PUT     | `/todos/:id`   | 指定したタスクを更新 |
| DELETE  | `/todos/:id`   | 指定したタスクを削除 |
※ 認証が必要なエンドポイントにはJWTが必要です。


## 認証方法
JWT（JSON Web Token）による認証を採用しています。
ログイン後に取得したトークンをリクエストヘッダーに設定してください。


## APIドキュメント
Swagger UIを使用してAPIの詳細仕様を確認できます。
- ローカル環境で起動後：`http://localhost:3000/api-docs`


## 使用技術
- Node.js
- Express.js
- MySQL
- JWT（jsonwebtoken）
- Swagger（swagger-jsdoc, swagger-ui-express）
- dotenv