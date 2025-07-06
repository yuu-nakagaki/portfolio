import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// インクルードファイルを読み込む関数
function loadInclude(includePath) {
  const fullPath = path.resolve(projectRoot, includePath);
  try {
    return fs.readFileSync(fullPath, 'utf8').trim();
  } catch (error) {
    console.error(`インクルードファイルの読み込みエラー: ${includePath}`);
    console.error(error.message);
    return `<!-- エラー: ${includePath} を読み込めませんでした -->`;
  }
}

// HTMLファイル内のインクルードを処理する関数
function processIncludes(htmlContent) {
  // <!-- @include path/to/file.html --> の形式でインクルードを処理
  const includeRegex = /<!--\s*@include\s+([^\s]+)\s*-->/g;
  
  return htmlContent.replace(includeRegex, (match, includePath) => {
    console.log(`インクルード処理中: ${includePath}`);
    return loadInclude(includePath);
  });
}

// HTMLファイルを処理する関数
function processHtmlFile(inputPath, outputPath) {
  try {
    console.log(`ファイル処理中: ${inputPath} -> ${outputPath}`);
    
    const htmlContent = fs.readFileSync(inputPath, 'utf8');
    const processedContent = processIncludes(htmlContent);
    
    // 出力ディレクトリが存在しない場合は作成
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, processedContent, 'utf8');
    console.log(`処理完了: ${path.relative(projectRoot, outputPath)}`);
  } catch (error) {
    console.error(`ファイル処理エラー ${inputPath}:`, error.message);
  }
}

// ディレクトリを再帰的に処理する関数
function processDirectory(inputDir, outputDir) {
  const entries = fs.readdirSync(inputDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const inputPath = path.join(inputDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);
    
    if (entry.isDirectory()) {
      // サブディレクトリを再帰的に処理
      processDirectory(inputPath, outputPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      // HTMLファイルを処理
      processHtmlFile(inputPath, outputPath);
    } else {
      // その他のファイルはそのままコピー
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      fs.copyFileSync(inputPath, outputPath);
    }
  }
}

// メイン処理
function main() {
  const isDev = process.argv.includes('--dev');
  
  console.log(`HTMLインクルードビルド開始 ${isDev ? '(開発モード)' : '(本番モード)'}...`);
  
  const outputDir = isDev ? projectRoot : path.resolve(projectRoot, '.temp-html');
  
  // dev mode以外の場合は一時ディレクトリをクリア
  if (!isDev) {
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // ルートディレクトリのHTMLファイルを処理
  const rootHtmlFiles = fs.readdirSync(projectRoot).filter(file => 
    file.endsWith('.html') && !file.startsWith('.temp-')
  );
  
  for (const file of rootHtmlFiles) {
    const inputPath = path.resolve(projectRoot, file);
    const outputPath = isDev ? 
      path.resolve(projectRoot, `.temp-${file}`) : 
      path.resolve(outputDir, file);
    
    // dev modeの場合、元ファイルをバックアップしてから処理
    if (isDev) {
      const backupPath = path.resolve(projectRoot, `${file}.backup`);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
      }
      processHtmlFile(backupPath, inputPath);
    } else {
      processHtmlFile(inputPath, outputPath);
    }
  }
  
  // allworksディレクトリを処理
  const allworksInputDir = path.resolve(projectRoot, 'allworks');
  const allworksOutputDir = isDev ? allworksInputDir : path.resolve(outputDir, 'allworks');
  
  if (fs.existsSync(allworksInputDir)) {
    processDirectory(allworksInputDir, allworksOutputDir);
  }
  
  if (isDev) {
    console.log('開発用HTMLビルド完了！');
    console.log('元のファイルは .backup 拡張子でバックアップされました');
    console.log('npm run dev でインクルード機能が動作します');
  } else {
    // 本番ビルド用にVite設定を更新
    updateViteConfig(outputDir);
    console.log('HTMLビルド完了！');
    console.log(`処理済みファイルの場所: ${path.relative(projectRoot, outputDir)}`);
    console.log('Vite設定を処理済みHTMLファイル用に更新しました');
  }
}

// Vite用の設定ファイルを更新する関数
function updateViteConfig(tempDir) {
  const viteConfigPath = path.resolve(projectRoot, 'vite.config.js');
  const viteConfigBackupPath = path.resolve(projectRoot, 'vite.config.js.backup');
  const tempViteConfigPath = path.resolve(projectRoot, 'vite.config.temp.js');
  
  try {
    // 元の設定をバックアップ（まだない場合のみ）
    if (!fs.existsSync(viteConfigBackupPath)) {
      fs.copyFileSync(viteConfigPath, viteConfigBackupPath);
    }
    
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // input pathsを.temp-htmlディレクトリのものに変更
    viteConfig = viteConfig.replace(
      /resolve\(__dirname, '([^']+\.html)'\)/g,
      (match, originalPath) => {
        return `resolve(__dirname, '.temp-html/${originalPath}')`;
      }
    );
    
    // 一時的に元のファイルを置き換え
    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log('Vite設定を処理済みHTMLファイル用に更新しました');
    
    return true;
  } catch (error) {
    console.error('Vite設定更新エラー:', error.message);
    return false;
  }
}

// スクリプトが直接実行された場合のみmainを実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processIncludes, processHtmlFile, processDirectory };