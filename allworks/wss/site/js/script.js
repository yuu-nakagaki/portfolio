//ハンバーガーメニュー開閉
const hamburgerBtn = document.getElementById("gnav__hamburger");
const menu = document.getElementById("gnav__menu-container");
const reserveBtn = document.getElementsByClassName("gnav__slide-link")[0];
hamburgerBtn.addEventListener("click", function () {
  if (hamburgerBtn.classList.contains("is-active")) {
    hamburgerBtn.classList.remove("is-active");
    menu.classList.remove("is-active");
    reserveBtn.classList.remove("hidden");
  } else {
    hamburgerBtn.classList.add("is-active");
    menu.classList.add("is-active");
    reserveBtn.classList.add("hidden");
  }
});

const menuLinkList = menu.querySelectorAll("a");
for (let i = 0; i < menuLinkList.length; i++) {
  menuLinkList[i].addEventListener("click", function () {
    hamburgerBtn.classList.remove("is-active");
    menu.classList.remove("is-active");
  });
}

//Q&Aセクションのカードめくり処理
const cardList = document.getElementsByClassName("question__card");
for (let i = 0; i < cardList.length; i++) {
  const card = cardList[i];
  card.addEventListener("click", function () {
    if (card.classList.contains("is-reverse")) {
      card.classList.remove("is-reverse");
    } else {
      card.classList.add("is-reverse");
    }
  });
}


//ビューポート内の上から70%の位置を指定
const position = Math.floor(window.innerHeight * .70);

//アクティブ対象クラス取得
const targetList = document.getElementsByClassName("js-scroll");

//対象要素をアクティブ（アニメーション開始状態）にする
function setActive() {
  for (let i = 0; i < targetList.length; i++) {
    //要素の上部座標を取得
    const offsetTop = Math.floor(targetList[i].getBoundingClientRect().top);

    //要素の上部座標がpositionの位置を通過したら、Class追加
    if (offsetTop < position) {
      targetList[i].classList.add("is-active");
    }
  }
}

let timer;
const headerLogo = document.getElementsByClassName("header__ttl")[0];
function hideHeaderLogo() {
  headerLogo.classList.add("hidden");

  //スクロール中はイベントの発火をキャンセルする
  clearTimeout(timer);

  //スクロールが停止して0.6秒後にイベントを発火する
  timer = setTimeout(function () {
    if (headerLogo.classList.contains("hidden")) {
      headerLogo.classList.remove("hidden");
    }
  }, 600);
}

const backBtn = document.getElementById("back-btn");
function showBackBtn() {
  if (window.pageYOffset > 300) {
    backBtn.classList.add("is-active");
  } else {
    backBtn.classList.remove("is-active");
  }
};

//スクロールイベントリスナーに登録
window.addEventListener("scroll", setActive, false);
window.addEventListener("scroll", hideHeaderLogo, false);
window.addEventListener("scroll", showBackBtn, false);