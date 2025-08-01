# YUU NAKAGAKI Portfolio Site

## 概要
フロントエンドエンジニア・中垣悠のポートフォリオサイトです。

## 開発環境

### 必要環境
- Node.js (v18以上推奨)
- npm

### 技術スタック
- **ビルドツール**: Vite
- **CSS前処理**: Sass/SCSS  
- **JavaScript**: Vanilla JavaScript + GSAP
- **アニメーション**: GSAP + ScrollTrigger
- **フォーム送信**: Google Forms
- **レスポンシブデザイン**: モバイルファースト

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:3000` が自動で開きます。

### 3. 本番ビルド
```bash
npm run build
```
`dist/` フォルダに最適化されたファイルが生成されます。

### 4. ビルド結果のプレビュー
```bash
npm run preview
```

## プロジェクト構造

```
portfolio/
├── index.html              # メインページ
├── thanks.html             # お問い合わせ完了ページ
├── allworks/              # 制作実績一覧
│   ├── index.html         # 制作実績一覧ページ
│   ├── armor/             # 各プロジェクトフォルダ
│   ├── musubi/
│   └── ...
├── includes/              # 共通HTMLパーツ（参考用・使用されていません）
├── sass/                  # Sassファイル
│   ├── style.scss         # メインSassファイル
│   ├── foundation/        # 基礎設定
│   ├── global/           # グローバル設定
│   ├── layout/           # レイアウト
│   ├── page/             # ページ固有のスタイル
│   └── utility/          # ユーティリティ
├── scripts/              # ビルドスクリプト
│   └── fix-dist-structure.js # dist構造修正・ファイル参照更新
├── css/                   # コンパイル済みCSS (既存)
├── images/               # 画像ファイル
├── js/                   # JavaScript
│   ├── function.js       # メインJavaScript
│   └── style-loader.js   # SCSS読み込み用（開発時のみ）
├── vite.config.js        # Vite設定ファイル
├── package.json          # npm設定
└── .gitignore            # Git除外設定
```

## 開発ワークフロー

### ビルドシステム
- **開発時**: Viteが`sass/style.scss`を自動コンパイル・HMR対応
- **本番時**: `sass/style.scss` → `scss-[hash].css`で最適化
- **JavaScript**: `js/function.js` → `main.js`に統一
- **画像最適化**: `build-assets/`ディレクトリにハッシュ付きで配置

### Sass/SCSS
- `sass/style.scss` がメインファイル
- 開発時：`js/style-loader.js`経由でSCSSをインポート、HMR完全対応
- 開発時：既存CSSファイル（`css/style.css`）は無効化してSCSSを優先
- 本番時：SCSSコンパイル後、自動的にハッシュ付きCSSファイルへ参照更新
- 全階層（トップ、allworks、下層ページ）でホットリロード対応

### ホットリロード
- HTMLファイル変更時: 完全リロード
- Sass/CSSファイル変更時: HMR（即座反映）
- JavaScriptファイル変更時: HMR

### 制作実績追加手順
1. `allworks/` 内に新しいプロジェクトフォルダを作成
2. `vite.config.js` の `rollupOptions.input` に新しいHTMLファイルを追加
3. メインページとall worksページに新しい作品を追加

## デプロイ

### 本番ビルドの実行
```bash
npm run build
```

**内部で自動実行される処理:**
1. `vite build` → `dist/`フォルダに最適化されたファイルを出力
   - JavaScriptファイル（`js/function.js`）→ `main.js`
   - SCSSファイル（`sass/style.scss`）→ `scss-[hash].css`
   - 画像ファイル → `build-assets/[name]-[hash].[ext]`
2. `npm run fix-dist` → dist構造修正とファイル参照更新
   - HTMLファイルを正しい位置に配置
   - 各HTMLファイル内のJavaScript・SCSS参照をハッシュ付きファイル名に更新
   - `images/`ディレクトリ、`css/`ディレクトリ、`favicon.ico`をコピー
   - 各プロジェクトの`site/`ディレクトリを自動コピー（Reactアプリ等）

### サーバーへのアップロード
```bash
# rsyncを使用する場合
rsync -av dist/ username@server:/path/to/web/directory/

# FTP/SFTPクライアントを使用する場合
# dist/フォルダの中身を全てサーバーのドキュメントルートにアップロード
```

## 開発機能

### レスポンシブ対応
- CSS Gridを使用した柔軟なレイアウト
- モバイルファーストのアプローチ
- 画像の最適化（WebP対応）

## ファイル編集ガイド

### HTMLファイルの編集
- 各HTMLファイル（`index.html`、`allworks/index.html`等）を直接編集してください
- 変更は即座に開発サーバーに反映されます

### スタイルの編集
- `sass/style.scss` およびその関連ファイルを編集
- 開発時は自動的にコンパイル・ホットリロードされます

## 移行履歴

### 2024年 - Vite導入
- **以前**: VS Code拡張機能（Prepros）でSassコンパイル・ホットリロード
- **現在**: Viteによる高速ビルド・開発環境
- **メリット**: より高速なHMR、モダンなビルドプロセス、npm管理

### 本番ビルド最適化システム導入
- **dist構造修正スクリプト**: `scripts/fix-dist-structure.js`
  - HTMLファイルの正しい配置
  - JavaScript・SCSS参照の自動更新（ハッシュ付きファイル名に対応）
  - 既存アセット（images/、css/、favicon.ico）の自動コピー
- **ファイル名最適化**:
  - JavaScript: `js/function.js` → `main.js` （シンプルな命名）
  - SCSS: `sass/style.scss` → `scss-[hash].css` （キャッシュバスティング対応）
  - 画像: `build-assets/[name]-[hash].[ext]` （ハッシュ付きでキャッシュ最適化）
- **自動参照更新**: 全HTMLファイルでハッシュ付きファイル名への参照を自動更新

### SCSS開発環境最適化
- **開発時専用SCSSローダー**: `js/style-loader.js`
  - JavaScript経由でSCSSをインポートしてVite HMR対応
  - 既存CSSファイルを無効化してSCSSを優先表示
  - 全階層（トップ、allworks、下層ページ）で完全なホットリロード対応

### 2024年末 - シンプル化
- HTMLインクルードシステムを削除してシンプルな構成に変更
- 直接HTMLファイルを編集する方式に戻し、管理を簡素化