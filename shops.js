// 顯示咖啡廳的詳細資訊並加上動畫效果
function showDetails(shopId) {
  const details = document.getElementById('details-' + shopId);
  details.style.display = 'block'; // 顯示視窗
  setTimeout(() => {
    details.classList.add('show'); // 開始顯示動畫
  }, 10); // 確保動畫能夠觸發
  updateFavoriteHeart(shopId); // 更新愛心狀態
}

// 關閉詳細資訊視窗並加上動畫效果
function closeDetails(shopId) {
  const details = document.getElementById('details-' + shopId);
  details.classList.remove('show'); // 移除動畫效果
  setTimeout(() => {
    details.style.display = 'none'; // 隱藏視窗
    updateFavoriteHeart(shopId); // 更新愛心狀態
  }, 300); // 動畫時間結束後才隱藏
}

// 過濾顯示具有指定標籤的店家
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

// 點擊標籤時，跳轉到該標籤的店家頁面
function goToTag(tag) {
  const encodedTag = encodeURIComponent(tag);
  window.location.href = `shopspage.html?tag=${encodedTag}`;
}

// 顯示特定標籤的店家頁面
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get('tag');

  if (tag) {
    filterByTag(tag); // 顯示過濾過的標籤
  }

  // 迭代每個店家的收藏狀態，初始化愛心圖示
  const shops = document.querySelectorAll('.coffee-shop');
  shops.forEach(shop => {
    const shopId = shop.dataset.shopId;
    updateFavoriteHeart(shopId); // 初始化愛心圖示
  });
};

// 假設這是從某個地方獲得的店家資料
const shopData = {
  'A': { name: 'Coffee Shop A', description: 'Cozy with a great atmosphere' },
  'B': { name: 'Coffee Shop B', description: 'Perfect for working and sipping coffee' },
  'C': { name: 'Coffee Shop C', description: 'Best place for pastries and coffee' },
  // 更多店家資料...
};

function toggleFavorite(shopId) {
  const shopElement = document.querySelector('.coffee-shop[onclick="showDetails(\'' + shopId + '\')"]');
  const name = shopElement.getAttribute('data-name');
  const description = shopElement.getAttribute('data-description');
  
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const heart = document.getElementById('heart-' + shopId);

  if (favorites[shopId]) {
      delete favorites[shopId];  // 移除收藏
      heart.innerHTML = '&#9825;'; // 空心愛心
  } else {
      favorites[shopId] = { name, description };  // 儲存店鋪資料
      heart.innerHTML = '&#9829;'; // 實心愛心
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}


// 更新愛心狀態
function updateFavoriteHeart(shopId) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const heart = document.getElementById('heart-' + shopId);
  heart.innerHTML = favorites[shopId] ? '&#9829;' : '&#9825;';
}

