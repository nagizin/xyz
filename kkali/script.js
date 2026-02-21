function playAudio() {
  var audio = document.getElementById("audioPlayer");
  audio.play();
}

function showAll(resetOrder = false) {
  var articles = document.querySelectorAll(".article");
  articles.forEach(function (article) {
    article.style.display = "flex";
  });

  document.getElementById("noArticlesMessage").style.display = "none";

  if (resetOrder) {
    sortArticlesByOldest();
  }
}

function filterArticles(tag) {
  var articles = document.querySelectorAll(".article");
  var hasArticles = false;

  articles.forEach(function (article) {
    var tags = article.getAttribute("data-tags");
    if (tags.includes(tag)) {
      article.style.display = "flex";
      hasArticles = true;
    } else {
      article.style.display = "none";
    }
  });

  var messageElement = document.getElementById("noArticlesMessage");
  if (hasArticles) {
    messageElement.style.display = "none";
  } else {
    messageElement.textContent = `“ #${tag} ” 에 해당하는 아티클이 없습니다.`;
    messageElement.style.display = "block";
  }
}

function sortArticlesByDate(showAllArticles = false) {
  var articlesContainer = document.getElementById("articlesContainer");
  var articles = Array.from(
    articlesContainer.getElementsByClassName("article")
  );

  if (showAllArticles) {
    articles.forEach((article) => {
      article.style.display = "flex";
    });
    document.getElementById("noArticlesMessage").style.display = "none";
  }

  articles.sort((a, b) => {
    var dateA = a.querySelector(".date-content").textContent.trim();
    var dateB = b.querySelector(".date-content").textContent.trim();
    return dateB.localeCompare(dateA); // 내림차순 정렬
  });

  articles.forEach((article) => {
    articlesContainer.appendChild(article);
  });
}

function sortArticlesByOldest() {
  var articlesContainer = document.getElementById("articlesContainer");
  var articles = Array.from(
    articlesContainer.getElementsByClassName("article")
  );

  articles.sort((a, b) => {
    var dateA = a.querySelector(".date-content").textContent.trim();
    var dateB = b.querySelector(".date-content").textContent.trim();
    return dateA.localeCompare(dateB); // 오름차순 정렬 (과거순)
  });

  articles.forEach((article) => {
    articlesContainer.appendChild(article);
  });
}

window.onload = function () {
  showAll(true);
};

// 랜덤이미지 움직임
function randomizeTop() {
  var img = document.getElementById("tail");
  var windowHeight = window.innerHeight; // 창의 내부 높이를 픽셀 단위로 가져옵니다.
  var newTop =
    Math.random() * (windowHeight - img.offsetHeight) +
    window.scrollY +
    windowHeight * 0.1; // 스크롤 위치와 화면 높이를 고려하여 계산
  img.style.top = newTop + "px"; // 픽셀 단위로 top 값을 설정
}

function randomizeTopTail02() {
  var img = document.getElementById("right-hand");
  var windowHeight = window.innerHeight; // 창의 내부 높이를 픽셀 단위로 가져옵니다.
  var newTop =
    Math.random() * (windowHeight - img.offsetHeight) +
    window.scrollY +
    windowHeight * 0.1; // 스크롤 위치와 화면 높이를 고려하여 계산
  img.style.top = newTop + "px"; // 픽셀 단위로 top 값을 설정
}

randomizeTop();
randomizeTopTail02();

setInterval(randomizeTop, 6000);
setInterval(randomizeTopTail02, 4000);

// 페이지 로딩 시뮬레이션
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000); // 3초 후 로딩 화면을 숨기고 메인 콘텐츠를 표시
});

document.addEventListener("DOMContentLoaded", function () {
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
    threshold: 300,
    load_delay: 50, // 페이지 로드 후 지연 로딩을 시작하기 전에 대기하는 시간 (밀리초)
    callback_loaded: function (element) {
      console.log(element, "has been loaded!");
    },
  });
});
