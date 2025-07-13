## TODO App 仕様書（改訂版）

### 概要
Hono と Drizzle ORM の学習を目的とした、シンプルなTODOアプリケーションを作成します。

### 技術スタック
- **フロントエンド**: Next.js (App Router), TypeScript
- **バックエンド**: Hono, Drizzle ORM, SQLite
- **ランタイム**: Bun
- **パッケージマネージャー**: pnpm
- **その他**: REST API

### 機能要件

#### 1. TODO管理機能
- **TODO一覧表示**: 全てのTODOを表示
- **TODO作成**: 新しいTODOを追加
- **TODO更新**: 既存のTODOの完了状態を切り替え
- **TODO削除**: 不要なTODOを削除

### データモデル

#### TODOテーブル
```typescript
{
  id: number,          // 主キー、自動採番
  title: string,       // TODOのタイトル（必須）
  completed: boolean,  // 完了状態（デフォルト: false）
  createdAt: Date,     // 作成日時
  updatedAt: Date      // 更新日時
}
```

### API仕様

#### エンドポイント一覧
- `GET /api/todos` - TODO一覧取得
- `POST /api/todos` - TODO作成
- `PATCH /api/todos/:id` - TODO更新（完了状態の切り替え）
- `DELETE /api/todos/:id` - TODO削除

### 画面構成

#### メイン画面（単一ページ）
1. **ヘッダー**: アプリタイトル表示
2. **TODO入力フォーム**: 新規TODO追加用
3. **TODO一覧**: 
   - 各TODOにチェックボックス（完了状態）
   - 削除ボタン
   - 完了したTODOは打ち消し線表示

### ディレクトリ構成

```
project-root/
├── frontend/               # Next.jsアプリ
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoForm.tsx
│   └── lib/
│       └── api.ts         # API通信用関数
│
└── backend/               # Honoアプリ（Bunで実行）
    ├── src/
    │   ├── index.ts       # エントリーポイント
    │   ├── routes/
    │   │   └── todos.ts   # TODOルート
    │   └── db/
    │       ├── schema.ts  # Drizzleスキーマ
    │       └── index.ts   # DB接続設定
    ├── drizzle/
    │   └── migrations/    # マイグレーションファイル
    └── drizzle.config.ts  # Drizzle設定
```

### 実装の優先順位

1. **バックエンド基本構築**
   - Bunでの Honoサーバーのセットアップ
   - DrizzleでSQLiteスキーマ定義
   - 基本的なCRUD APIの実装

2. **フロントエンド基本構築**
   - Next.jsのセットアップ（pnpm使用）
   - TODO一覧表示
   - TODO追加機能

3. **機能完成**
   - 完了状態の切り替え
   - TODO削除機能
   - UIの調整

### 開発環境セットアップ

#### バックエンド
```bash
cd backend
bun init
bun add hono @hono/node-server
bun add drizzle-orm better-sqlite3
bun add -d drizzle-kit @types/better-sqlite3
```

#### フロントエンド
```bash
cd frontend
pnpm create next-app@latest . --typescript --app --no-src-dir
pnpm add axios # またはfetch APIを使用
```

### 実行コマンド

#### バックエンド
```bash
# 開発サーバー起動
bun run dev

# マイグレーション実行
bun run drizzle-kit generate:sqlite
bun run drizzle-kit push:sqlite
```

#### フロントエンド
```bash
# 開発サーバー起動
pnpm dev
```

### ポート設定
- **バックエンド**: http://localhost:3001
- **フロントエンド**: http://localhost:3000

この仕様で、Bunの高速な実行環境を活用しながら、Hono と Drizzle の基本的な使い方を学習できます。