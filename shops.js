function filterByTag(tag) {
  const shops = document.querySelectorAll('.coffee-shop');
  shops.forEach(shop => {
      const tags = shop.querySelectorAll('.tag');
      let hasTag = false;

      tags.forEach(t => {
          if (t.textContent.replace('#', '') === tag) {
              hasTag = true;
          }
      });

      shop.style.display = hasTag ? 'block' : 'none';
  });
}


// 顯示咖啡廳的詳細資訊並加上動畫效果
function showDetails(shopId) {
  const details = document.getElementById('details-' + shopId);
  details.style.display = 'block'; // 顯示視窗
  setTimeout(() => {
      details.classList.add('show'); // 開始顯示動畫
  }, 10); // 確保動畫能夠觸發
}

// 關閉詳細資訊視窗並加上動畫效果
function closeDetails(shopId) {
  const details = document.getElementById('details-' + shopId);
  details.classList.remove('show'); // 移除動畫效果
  setTimeout(() => {
      details.style.display = 'none'; // 隱藏視窗
  }, 300); // 動畫時間結束後才隱藏
}




  function goToTag(tag) {
    const encodedTag = encodeURIComponent(tag);
    window.location.href = `shopspage.html?tag=${encodedTag}`;
}


window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get('tag');

  if (tag) {
      filterByTag(tag);
  }
};
