import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const tempHtmlDir = path.resolve(distDir, '.temp-html');

console.log('dist構造修正開始...');

// .temp-htmlディレクトリが存在する場合のみ処理
if (fs.existsSync(tempHtmlDir)) {
  // HTMLファイルを正しい場所に移動
  const indexHtml = path.resolve(tempHtmlDir, 'index.html');
  const thanksHtml = path.resolve(tempHtmlDir, 'thanks.html');
  const allworksDir = path.resolve(tempHtmlDir, 'allworks');
  
  // ルートのHTMLファイルを移動
  if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, path.resolve(distDir, 'index.html'));
    console.log('index.htmlを移動しました');
  }
  
  if (fs.existsSync(thanksHtml)) {
    fs.copyFileSync(thanksHtml, path.resolve(distDir, 'thanks.html'));
    console.log('thanks.htmlを移動しました');
  }
  
  // allworksディレクトリを移動
  if (fs.existsSync(allworksDir)) {
    const distAllworksDir = path.resolve(distDir, 'allworks');
    
    // 既存のallworksディレクトリを削除（画像のみの場合）
    if (fs.existsSync(distAllworksDir)) {
      fs.rmSync(distAllworksDir, { recursive: true });
    }
    
    // 新しいallworksディレクトリをコピー
    copyDir(allworksDir, distAllworksDir);
    console.log('allworksディレクトリを移動しました');
  }
  
  // .temp-htmlディレクトリを削除
  fs.rmSync(tempHtmlDir, { recursive: true });
  console.log('.temp-htmlディレクトリを削除しました');
  
  // HTMLファイル内のJavaScript参照を修正
  fixJavaScriptReferences();
  
  // HTMLファイル内のSCSS参照を修正
  fixScssReferences();
  
} else {
  console.log('.temp-htmlディレクトリが存在しません。修正をスキップします。');
}

// HTMLファイル内のJavaScript参照を修正（常に実行）
fixJavaScriptReferences();

// HTMLファイル内のSCSS参照を修正（常に実行）
fixScssReferences();

// imagesディレクトリをdistにコピー
copyImagesDirectory();

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function fixJavaScriptReferences() {
  console.log('JavaScript参照を修正中...');
  
  // main.jsファイルを使用
  const jsFileName = 'main.js';
  const jsFilePath = path.resolve(distDir, jsFileName);
  
  if (!fs.existsSync(jsFilePath)) {
    console.log('main.jsファイルが見つかりません');
    return;
  }
  
  console.log(`JavaScriptファイル: ${jsFileName}`);
  
  // index.htmlを修正
  const indexHtmlPath = path.resolve(distDir, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let content = fs.readFileSync(indexHtmlPath, 'utf8');
    content = content.replace(
      /<script src="js\/function\.js\?[^"]*"><\/script>/g,
      `<script src="main.js"></script>`
    );
    fs.writeFileSync(indexHtmlPath, content);
    console.log('index.htmlのJavaScript参照を修正しました');
  }
  
  // thanks.htmlを修正
  const thanksHtmlPath = path.resolve(distDir, 'thanks.html');
  if (fs.existsSync(thanksHtmlPath)) {
    let content = fs.readFileSync(thanksHtmlPath, 'utf8');
    content = content.replace(
      /<script src="js\/function\.js"><\/script>/g,
      `<script src="../main.js"></script>`
    );
    fs.writeFileSync(thanksHtmlPath, content);
    console.log('thanks.htmlのJavaScript参照を修正しました');
  }
  
  // allworksディレクトリ内のHTMLファイルを修正
  const allworksDir = path.resolve(distDir, 'allworks');
  if (fs.existsSync(allworksDir)) {
    fixAllworksJavaScriptReferences(allworksDir, jsFileName);
  }
}

function fixAllworksJavaScriptReferences(allworksDir, jsFileName) {
  const entries = fs.readdirSync(allworksDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(allworksDir, entry.name);
    
    if (entry.isDirectory()) {
      // サブディレクトリの場合、index.htmlを探す
      const indexHtmlPath = path.join(entryPath, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        let content = fs.readFileSync(indexHtmlPath, 'utf8');
        content = content.replace(
          /<script src="\.\.\/\.\.\/js\/function\.js"><\/script>/g,
          `<script src="../../main.js"></script>`
        );
        // ビルド後の最適化されたHTMLでのJavaScript参照も修正
        content = content.replace(
          /<script src="\.\.\/\.\.\/main\.js"><\/script>/g,
          `<script src="/main.js"></script>`
        );
        fs.writeFileSync(indexHtmlPath, content);
        console.log(`${entry.name}/index.htmlのJavaScript参照を修正しました`);
      }
    } else if (entry.name === 'index.html') {
      // allworks直下のindex.htmlの場合
      let content = fs.readFileSync(entryPath, 'utf8');
      content = content.replace(
        /<script src="\.\.\/js\/function\.js"><\/script>/g,
        `<script src="../main.js"></script>`
      );
      fs.writeFileSync(entryPath, content);
      console.log('allworks/index.htmlのJavaScript参照を修正しました');
    }
  }
}

function fixScssReferences() {
  console.log('SCSS参照を修正中...');
  
  // scssファイル名を取得
  const scssFiles = fs.readdirSync(distDir).filter(file => file.startsWith('scss-') && file.endsWith('.css'));
  
  if (scssFiles.length === 0) {
    console.log('SCSSファイルが見つかりません');
    return;
  }
  
  const scssFileName = scssFiles[0];
  console.log(`SCSSファイル: ${scssFileName}`);
  
  // index.htmlのSCSS参照を修正
  const indexHtmlPath = path.resolve(distDir, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let content = fs.readFileSync(indexHtmlPath, 'utf8');
    content = content.replace(
      /<link href="\.\/sass\/style\.scss" rel="stylesheet" media="all">/g,
      `<link href="${scssFileName}" rel="stylesheet" media="all">`
    );
    fs.writeFileSync(indexHtmlPath, content);
    console.log('index.htmlのSCSS参照を修正しました');
  }
  
  // thanks.htmlのSCSS参照を修正
  const thanksHtmlPath = path.resolve(distDir, 'thanks.html');
  if (fs.existsSync(thanksHtmlPath)) {
    let content = fs.readFileSync(thanksHtmlPath, 'utf8');
    content = content.replace(
      /<link href="sass\/style\.scss" rel="stylesheet" media="all">/g,
      `<link href="${scssFileName}" rel="stylesheet" media="all">`
    );
    fs.writeFileSync(thanksHtmlPath, content);
    console.log('thanks.htmlのSCSS参照を修正しました');
  }
  
  // allworksディレクトリ内のHTMLファイルのSCSS参照を修正
  const allworksDir = path.resolve(distDir, 'allworks');
  if (fs.existsSync(allworksDir)) {
    fixAllworksScssReferences(allworksDir, scssFileName);
  }
}

function fixAllworksScssReferences(allworksDir, scssFileName) {
  const entries = fs.readdirSync(allworksDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(allworksDir, entry.name);
    
    if (entry.isDirectory()) {
      // サブディレクトリの場合、index.htmlを探す
      const indexHtmlPath = path.join(entryPath, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        let content = fs.readFileSync(indexHtmlPath, 'utf8');
        content = content.replace(
          /<link href="\.\.\/sass\/style\.scss" rel="stylesheet" media="all">/g,
          `<link href="../../${scssFileName}" rel="stylesheet" media="all">`
        );
        fs.writeFileSync(indexHtmlPath, content);
        console.log(`${entry.name}/index.htmlのSCSS参照を修正しました`);
      }
    } else if (entry.name === 'index.html') {
      // allworks直下のindex.htmlの場合
      let content = fs.readFileSync(entryPath, 'utf8');
      content = content.replace(
        /<link href="\.\.\/sass\/style\.scss" rel="stylesheet" media="all">/g,
        `<link href="../${scssFileName}" rel="stylesheet" media="all">`
      );
      // ビルド後の最適化されたHTMLでのSCSS参照も修正
      content = content.replace(
        /<link href="\/style-[^"]+\.scss" rel="stylesheet" media="all">/g,
        `<link href="/${scssFileName}" rel="stylesheet" media="all">`
      );
      fs.writeFileSync(entryPath, content);
      console.log('allworks/index.htmlのSCSS参照を修正しました');
    }
  }
}

function copyImagesDirectory() {
  console.log('imagesディレクトリをコピー中...');
  const imagesDir = path.resolve(projectRoot, 'images');
  const distImagesDir = path.resolve(distDir, 'images');
  
  if (fs.existsSync(imagesDir)) {
    copyDir(imagesDir, distImagesDir);
    console.log('imagesディレクトリをコピーしました');
  } else {
    console.log('imagesディレクトリが存在しません');
  }
  
  // favicon.icoもコピー
  const faviconSrc = path.resolve(projectRoot, 'favicon.ico');
  const faviconDest = path.resolve(distDir, 'favicon.ico');
  
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, faviconDest);
    console.log('favicon.icoをコピーしました');
  }
  
  // css/ディレクトリもコピー
  const cssDir = path.resolve(projectRoot, 'css');
  const distCssDir = path.resolve(distDir, 'css');
  
  if (fs.existsSync(cssDir)) {
    copyDir(cssDir, distCssDir);
    console.log('cssディレクトリをコピーしました');
  }
  
  // allworks内の各プロジェクトのsiteディレクトリをコピー
  const allworksDir = path.resolve(projectRoot, 'allworks');
  const distAllworksDir = path.resolve(distDir, 'allworks');
  
  if (fs.existsSync(allworksDir)) {
    const projects = fs.readdirSync(allworksDir, { withFileTypes: true });
    
    for (const project of projects) {
      if (project.isDirectory()) {
        const siteDir = path.resolve(allworksDir, project.name, 'site');
        if (fs.existsSync(siteDir)) {
          const distSiteDir = path.resolve(distAllworksDir, project.name, 'site');
          copyDir(siteDir, distSiteDir);
          console.log(`${project.name}/siteディレクトリをコピーしました`);
        }
      }
    }
  }
}

console.log('dist構造修正完了！');