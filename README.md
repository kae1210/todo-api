# 認証付きToDoアプリ

このアプリは、Node.js（Express）とMySQLで構成されたバックエンドAPIと、Reactによるフロントエンドで構成されたTODO管理アプリです。JWTによるログイン認証機能を備えています。

## デモ動画
以下のリンクからアプリの動作をご確認いただけます。

- [Todoアプリのデモ動画](https://drive.google.com/file/d/1ykmnTIuxI9tMvJBRJGHxy1Wb8q9CzMNn/view?usp=drive_link)

## 構成
ToDo-app
├── backend
├── frontend
└── README.md

##  機能一覧
- ユーザー登録／ログイン（JWT認証）
- タスクの作成／更新／削除
- SwaggerによるAPIドキュメント（`http://localhost:3001/api-docs`）

##  使用技術
- React
- Node.js
- Express.js
- MySQL

##  セットアップ手順
※ 事前にNode.js（v22.x）とMySQLをインストールします。
###  Backend
```bash
cd ToDo-app/backend
npm install
node app.js
```
###  Frontend
```bash
cd ToDo-app/frontend
npm install
npm start
```
起動後（`http://localhost:3000`）にアクセスします。
