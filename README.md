# Todo API

このプロジェクトは、Node.jsとMySQLを使用したToDo管理APIです。

## 🔧 環境構築
1. `.env` ファイルを作成し、データベースの接続情報を設定
2. 必要なパッケージをインストール
    ```sh
    npm install
    ```
3. サーバーを起動
    ```sh
    npm start
    ```

## 📌 エンドポイント
| メソッド | エンドポイント       | 説明 |
|---------|----------------|------|
| GET     | `/todos`       | すべてのタスクを取得 |
| POST    | `/todos`       | 新しいタスクを追加 |
| PUT     | `/todos/:id`   | 指定したタスクを更新 |
| DELETE  | `/todos/:id`   | 指定したタスクを削除 |

## 📄 使用技術
- Node.js
- Express.js
- MySQL
