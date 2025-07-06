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
- **HTMLテンプレート**: 独自インクルードシステム（Node.js）
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
├── includes/              # 共通HTMLパーツ（HTMLインクルードシステム）
│   ├── head/             # HEADタグ内の共通要素
│   │   ├── meta-base.html    # 基本メタタグ
│   │   ├── meta-top.html     # トップページ用メタタグ
│   │   ├── meta-page.html    # サブページ用メタタグ
│   │   ├── meta-thanks.html  # thanksページ用メタタグ
│   │   ├── fonts.html        # Google Fonts
│   │   ├── css-top.html      # トップページ用CSS
│   │   ├── css-page.html     # サブページ用CSS
│   │   └── css-thanks.html   # thanksページ用CSS
│   ├── header/           # ヘッダー関連
│   │   ├── header-top.html   # トップページ用ヘッダー
│   │   ├── header-page.html  # サブページ用ヘッダー
│   │   ├── nav-top.html      # トップページ用ナビゲーション
│   │   └── nav-page.html     # サブページ用ナビゲーション
│   ├── footer/           # フッター関連
│   │   ├── footer-top.html   # トップページ用フッター
│   │   └── footer-simple.html # シンプルフッター
│   └── scripts/          # スクリプト関連
│       ├── gsap-common.html  # GSAP読み込み
│       ├── js-top.html       # トップページ用JS
│       ├── js-page.html      # サブページ用JS
│       └── js-thanks.html    # thanksページ用JS
├── sass/                  # Sassファイル
│   ├── style.scss         # メインSassファイル
│   ├── foundation/        # 基礎設定
│   ├── global/           # グローバル設定
│   ├── layout/           # レイアウト
│   ├── page/             # ページ固有のスタイル
│   └── utility/          # ユーティリティ
├── scripts/              # ビルドスクリプト
│   ├── build-html.js         # HTMLインクルード処理
│   └── restore-html.js       # ファイル復元処理
├── css/                   # コンパイル済みCSS (既存)
├── images/               # 画像ファイル
├── js/                   # JavaScript
│   └── function.js       # メインJavaScript
├── vite.config.js        # Vite設定ファイル
├── package.json          # npm設定
└── .gitignore            # Git除外設定
```

## 開発ワークフロー

### Sass/SCSS
- `sass/style.scss` がメインファイル
- Viteが自動でコンパイル・HMR対応
- 既存のCSSファイルも並行して使用可能

### ホットリロード
- HTMLファイル変更時: 完全リロード（include処理後）
- Sass/CSSファイル変更時: HMR（即座反映）
- JavaScriptファイル変更時: HMR
- includesファイル変更時: 開発サーバー再起動が必要

### 制作実績追加手順
1. `allworks/` 内に新しいプロジェクトフォルダを作成
2. `vite.config.js` の `rollupOptions.input` に新しいHTMLファイルを追加
3. メインページとall worksページに新しい作品を追加

## デプロイ

### 自動化されたデプロイ手順

本プロジェクトでは、HTMLインクルード機能と従来のViteワークフローを組み合わせた自動化されたビルドプロセスを採用しています。

#### 1. 本番ビルドの実行
```bash
npm run build
```

**内部で自動実行される処理:**
1. `npm run build:html` → includeファイルを展開して`.temp-html/`ディレクトリに処理済みHTMLを生成
2. Vite設定を一時的に更新（処理済みHTMLファイルを参照するように変更）
3. `vite build` → `dist/`フォルダに最適化されたファイルを出力
4. `npm run restore` → 設定とファイルを自動的に元の状態に復元

#### 2. サーバーへのアップロード
```bash
# rsyncを使用する場合
rsync -av dist/ username@server:/path/to/web/directory/

# FTP/SFTPクライアントを使用する場合
# dist/フォルダの中身を全てサーバーのドキュメントルートにアップロード
```

### 開発とデプロイの違い

| 環境 | HTMLファイルの状態 | 用途 |
|------|-------------------|------|
| **開発時** | `<!-- @include ... -->` 記法 | 共通部分の管理・編集 |
| **本番時** | 完全に展開されたHTML | サーバーでの高速表示 |

### 手動操作が必要な場合

#### HTMLファイルを元の状態に戻す
```bash
npm run restore
```
開発中に何らかの問題が発生した場合、include記法の状態に戻すことができます。

#### 開発サーバーの起動
```bash
npm run dev
```
自動的にincludeファイルを処理してから開発サーバーを起動します。

## 開発機能

### レスポンシブ対応
- CSS Gridを使用した柔軟なレイアウト
- モバイルファーストのアプローチ
- 画像の最適化（WebP対応）

## 共通パーツ管理

### HTMLインクルードシステム

`includes/` フォルダには共通HTMLパーツを格納し、Node.jsビルドスクリプトによる自動インクルード機能を実装しています。

#### 構成
- **head/**: メタタグ、CSS、フォント読み込み
  - `meta-base.html` - 基本メタタグ
  - `meta-top.html`, `meta-page.html`, `meta-thanks.html` - ページ別メタタグ
  - `fonts.html` - Google Fonts読み込み
  - `css-*.html` - ページ別CSS読み込み
- **header/**: ヘッダーとナビゲーション
  - `header-top.html`, `header-page.html` - ページ別ヘッダー
  - `nav-top.html`, `nav-page.html` - ページ別ナビゲーション
- **footer/**: フッター（シンプル・ナビゲーション付き）
  - `footer-top.html`, `footer-simple.html` - 用途別フッター
- **scripts/**: JavaScript読み込み
  - `gsap-common.html` - GSAP関連スクリプト
  - `js-*.html` - ページ別JavaScript読み込み

#### インクルード記法
HTMLファイル内で以下の記法を使用：
```html
<!-- @include includes/head/meta-base.html -->
<!-- @include includes/header/header-top.html -->
```

#### メリット
- **開発効率**: 共通部分の一元管理
- **保守性**: ヘッダー変更時は1ファイルの編集で全ページに反映
- **パフォーマンス**: 本番では完全に展開されたHTMLファイル

### ファイル編集ガイド

#### HTMLコンテンツの修正方法

**⚠️ 重要**: 現在の開発環境では、編集前に以下の手順を実行してください：

1. **復元コマンドを実行**
   ```bash
   npm run restore
   ```
   これで`index.html`等がinclude記法の状態に戻ります。

2. **適切なファイルを編集**

| 修正内容 | 編集するファイル | 例 |
|---------|----------------|---|
| **本文内容** | `index.html` | メインビジュアル、works、profile、contact等 |
| **メタタグ** | `includes/head/meta-*.html` | title、description、keywords等 |
| **ヘッダー** | `includes/header/header-*.html` | ロゴ、サイト名等 |
| **ナビゲーション** | `includes/header/nav-*.html` | メニュー項目、リンク等 |
| **フッター** | `includes/footer/footer-*.html` | コピーライト、リンク等 |
| **JavaScript** | `includes/scripts/js-*.html` | スクリプト読み込み |
| **CSS読み込み** | `includes/head/css-*.html` | スタイルシート参照 |

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```
   自動的にincludeを展開してサーバーが起動されます。

#### ページ別ファイル対応表

**トップページ (`index.html`):**
- メタタグ: `includes/head/meta-top.html`
- ヘッダー: `includes/header/header-top.html`
- ナビ: `includes/header/nav-top.html`
- フッター: `includes/footer/footer-top.html`
- スクリプト: `includes/scripts/js-top.html`

**サブページ (`allworks/index.html`等):**
- メタタグ: `includes/head/meta-page.html`
- ヘッダー: `includes/header/header-page.html`
- ナビ: `includes/header/nav-page.html`
- フッター: `includes/footer/footer-simple.html`
- スクリプト: `includes/scripts/js-page.html`

**Thanksページ (`thanks.html`):**
- メタタグ: `includes/head/meta-thanks.html`
- スクリプト: `includes/scripts/js-thanks.html`

## 移行履歴

### 2024年 - Vite導入
- **以前**: VS Code拡張機能（Prepros）でSassコンパイル・ホットリロード
- **現在**: Viteによる高速ビルド・開発環境
- **メリット**: より高速なHMR、モダンなビルドプロセス、npm管理

### HTMLインクルードシステム導入
- includesディレクトリ構造を整備
- Node.jsビルドスクリプトによるHTMLインクルード機能を実装
- `<!-- @include ... -->` 記法による共通パーツ管理
- 開発・本番環境の自動切り替えシステム構築
- Viteとの統合による最適化されたビルドプロセス