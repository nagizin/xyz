const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhj-dfZfiIQKpVT6nOHjR1w6kTUfpNkFPXOTHH2PKHsn-hNkYBYYomv7yioPvNiOQma_3nurWDUj46/pub?gid=0&single=true&output=csv";

async function loadData() {
  const res = await fetch(sheetURL + "&t=" + Date.now());
  const text = await res.text();

  const parsed = Papa.parse(text, { header: true });
  const data = parsed.data;

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  let totalCost = 0;
  let totalQty = 0;
  let storeSet = new Set();
  let citySet = new Set();

  data.forEach((row) => {
    if (!row.Date) return;

    storeSet.add(row.Location);
    citySet.add(row.City);
    totalQty += Number(row.Qty);
    totalCost += Number(row.Cost);
    let photosHTML = "";

    if (row.Photo) {
      const urls = row.Photo.split("|");

      urls.forEach((url) => {
        photosHTML += `<img src="${url.trim()}" class="thumb" />`;
      });
    }
    // 메모 5글자 이상이면 ...
    let noteText = row.Note || "";
    let shortNote =
      noteText.length > 5 ? noteText.substring(0, 7) + "..." : noteText;

    const tr = document.createElement("tr");

    tr.innerHTML = `
  <td class="photo-group">${photosHTML}</td>
  <td>${row.Date || ""}</td>
  <td>${row.Location || ""}</td>
  <td>${row.City || ""}</td>
  <td>${row.Drink || ""}</td>
  <td>${row.Temp || ""}</td>
  <td class="mobileNone">${row.Qty || ""}</td>
  <td>₩${Number(row.Cost || 0).toLocaleString()}</td>
  <td>${row.With || ""}</td>
  <td class="note-cell mobileNone" data-note="${noteText}">
    ${shortNote}
  </td>
`;

    tbody.appendChild(tr);
  });

  document.getElementById("summary").innerHTML =
    `신나리는 현재까지  <span class="highlight">${citySet.size}</span>개 도시의 스타벅스 매장 <span class="highlight">${storeSet.size}</span>곳을 방문하여 음료 <span class="highlight">${totalQty}</span>잔을 주문하였고, 총 <span class="highlight">${totalCost.toLocaleString()}</span>원을 지출했습니다.
   <br> <a class="highlight_googlemap" href="https://www.google.com/maps/d/edit?mid=1R-skqjie-mGe1XhawKteWc7K6yO4NbU&usp=sharing" target="_blank">구글 지도</a>에서 보기`;
}

loadData();

// 이미지 클릭
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("thumb")) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalImg").src = e.target.src;
  }
});

// 메모 클릭
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("note-cell")) {
    const fullNote = e.target.getAttribute("data-note");
    document.getElementById("noteModal").style.display = "block";
    document.getElementById("noteContent").innerText = fullNote;
  }
});

// 배경 클릭하면 이미지 모달 닫기
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target.id === "imageModal") {
    this.style.display = "none";
  }
});

// 배경 클릭하면 메모 모달 닫기
document.getElementById("noteModal").addEventListener("click", function (e) {
  if (e.target.id === "noteModal") {
    this.style.display = "none";
  }
});
