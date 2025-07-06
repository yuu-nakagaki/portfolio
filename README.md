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
├── sass/                  # Sassファイル
│   ├── style.scss         # メインSassファイル
│   ├── foundation/        # 基礎設定
│   ├── global/           # グローバル設定
│   ├── layout/           # レイアウト
│   ├── page/             # ページ固有のスタイル
│   └── utility/          # ユーティリティ
├── css/                   # コンパイル済みCSS (既存)
├── images/               # 画像ファイル
├── js/                   # JavaScript
│   └── function.js       # メインJavaScript
├── vite.config.js        # Vite設定ファイル
└── package.json          # npm設定
```

## 開発ワークフロー

### Sass/SCSS
- `sass/style.scss` がメインファイル
- Viteが自動でコンパイル・HMR対応
- 既存のCSSファイルも並行して使用可能

### ホットリロード
- HTMLファイル変更時: 完全リロード
- Sass/CSSファイル変更時: HMR（即座反映）
- JavaScriptファイル変更時: HMR

### 制作実績追加手順
1. `allworks/` 内に新しいプロジェクトフォルダを作成
2. `vite.config.js` の `rollupOptions.input` に新しいHTMLファイルを追加
3. メインページとall worksページに新しい作品を追加

## デプロイ

1. 本番ビルドを実行
```bash
npm run build
```

2. `dist/` フォルダの内容をサーバーにアップロード

## 移行履歴

### 2024年 - Vite導入
- **以前**: VS Code拡張機能（Prepros）でSassコンパイル・ホットリロード
- **現在**: Viteによる高速ビルド・開発環境
- **メリット**: より高速なHMR、モダンなビルドプロセス、npm管理