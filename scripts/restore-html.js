import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// HTMLファイルを元に戻す関数
function restoreHtmlFiles() {
  console.log('バックアップからHTMLファイルを復元中...');
  
  // ルートディレクトリのバックアップファイルを探す
  const files = fs.readdirSync(projectRoot);
  const backupFiles = files.filter(file => file.endsWith('.html.backup'));
  
  let restoredCount = 0;
  
  for (const backupFile of backupFiles) {
    const originalFile = backupFile.replace('.backup', '');
    const backupPath = path.resolve(projectRoot, backupFile);
    const originalPath = path.resolve(projectRoot, originalFile);
    
    try {
      // バックアップから元ファイルを復元
      fs.copyFileSync(backupPath, originalPath);
      // バックアップファイルを削除
      fs.unlinkSync(backupPath);
      
      console.log(`復元完了: ${originalFile}`);
      restoredCount++;
    } catch (error) {
      console.error(`復元エラー ${originalFile}:`, error.message);
    }
  }
  
  // 一時ファイルも削除
  const tempFiles = files.filter(file => file.startsWith('.temp-') && file.endsWith('.html'));
  for (const tempFile of tempFiles) {
    try {
      fs.unlinkSync(path.resolve(projectRoot, tempFile));
      console.log(`一時ファイル削除: ${tempFile}`);
    } catch (error) {
      console.error(`一時ファイル削除エラー ${tempFile}:`, error.message);
    }
  }
  
  // Vite設定も復元
  const viteConfigPath = path.resolve(projectRoot, 'vite.config.js');
  const viteConfigBackupPath = path.resolve(projectRoot, 'vite.config.js.backup');
  
  if (fs.existsSync(viteConfigBackupPath)) {
    try {
      fs.copyFileSync(viteConfigBackupPath, viteConfigPath);
      fs.unlinkSync(viteConfigBackupPath);
      console.log('Vite設定復元完了');
    } catch (error) {
      console.error('Vite設定復元エラー:', error.message);
    }
  }
  
  // .temp-htmlディレクトリも削除
  const tempHtmlDir = path.resolve(projectRoot, '.temp-html');
  if (fs.existsSync(tempHtmlDir)) {
    try {
      fs.rmSync(tempHtmlDir, { recursive: true });
      console.log('.temp-html ディレクトリ削除完了');
    } catch (error) {
      console.error('.temp-html ディレクトリ削除エラー:', error.message);
    }
  }
  
  if (restoredCount > 0) {
    console.log(`${restoredCount}個のHTMLファイルの復元が完了しました！`);
    console.log('ファイルはインクルード記法の形式に戻りました');
  } else {
    console.log('復元するバックアップファイルが見つかりませんでした');
  }
}

// スクリプトが直接実行された場合のみ実行
if (import.meta.url === `file://${process.argv[1]}`) {
  restoreHtmlFiles();
}

export { restoreHtmlFiles };