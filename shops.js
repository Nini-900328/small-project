let currentImageIndex = 0; // 初始顯示的圖片索引

// 顯示咖啡廳的詳細資訊並加上動畫效果
function showDetails(shopId) {
  const details = document.getElementById('details-' + shopId);
  details.style.display = 'block'; // 顯示視窗
  setTimeout(() => {
    details.classList.add('show'); // 開始顯示動畫
  }, 10); // 確保動畫能夠觸發

  // 顯示圖片
  const shopImages = {
    'A': ['./photo/Liao.jpg', './photo/Liao2.jpg', './photo/Liao3.jpg'],
    'B': ['./photo/ATC1.jpg', './photo/ATC2.jpg', './photo/ATC3.jpg'],
    'C': ['./photo/bluebird1.jpg', './photo/bluebird2.jpg'],
    'D': ['./photo/ART1.jpg', './photo/ART2.jpg'],
    'E': ['./photo/71-1.jpg', './photo/71-2.jpg', './photo/71-3.jpg'],
    'F': ['./photo/Overture1.jpg', './photo/Overture2.jpg', './photo/Overture3.jpg'],
    // 其他店鋪的圖片
  };

  const images = shopImages[shopId];
  displayShopImages(shopId, images); // 顯示圖片
  updateFavoriteHeart(shopId); // 更新愛心狀態
}

// 顯示圖片
function displayShopImages(shopId, images) {
  const imageContainer = document.querySelector(`#details-${shopId} .shop-images`);
  imageContainer.innerHTML = ''; // 清空當前的圖片

  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Image for ${shopId}`;
    img.dataset.index = index; // 儲存每張圖片的索引
    imageContainer.appendChild(img);
  });

  // 初始化顯示的圖片
  currentImageIndex = 0;
  updateImagePosition(shopId);
}

// 控制圖片切換
function changeImage(direction, shopId) {
  const images = document.querySelectorAll(`#details-${shopId} .shop-images img`);
  const totalImages = images.length;

  // 更新圖片索引，使用餘數來確保不會跳回第一張
  currentImageIndex = (currentImageIndex + direction) % totalImages;
  
  // 當圖片到達最後一張，會繼續顯示第一張
  if (currentImageIndex < 0) {
    currentImageIndex = totalImages - 1;
  }

  updateImagePosition(shopId);
}

// 更新顯示的圖片位置
function updateImagePosition(shopId) {
  const images = document.querySelectorAll(`#details-${shopId} .shop-images img`);
  const totalImages = images.length;

  // 計算每次移動的偏移量
  const offset = -currentImageIndex * 100; // 每次移動一張圖片的寬度
  const container = document.querySelector(`#details-${shopId} .shop-images`);
  
  container.style.transition = 'none'; // 取消過渡，避免過渡帶來的效果
  container.style.transform = `translateX(${offset}%)`;
}

// 更新愛心狀態
function updateFavoriteHeart(shopId) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const heart = document.getElementById('heart-' + shopId);
  heart.innerHTML = favorites[shopId] ? '&#9829;' : '&#9825;';
}

// 點擊愛心按鈕加入或移除收藏
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

// 關閉詳細資訊視窗並加上動畫效果
function closeDetails(shopId) {
  const details = document.getElementById('details-' + shopId);
  details.classList.remove('show'); // 移除動畫效果
  setTimeout(() => {
    details.style.display = 'none'; // 隱藏視窗
    updateFavoriteHeart(shopId); // 更新愛心狀態
  }, 300); // 動畫時間結束後才隱藏
}

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