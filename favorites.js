window.onload = function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const container = document.getElementById('favorites-container');
    const noFavoritesMsg = document.getElementById('no-favorites-msg');

    // 清空容器
    container.innerHTML = '';

    // 檢查是否有收藏
    if (Object.keys(favorites).length === 0) {
        noFavoritesMsg.style.display = 'block';  // 顯示空的提示訊息
    } else {
        noFavoritesMsg.style.display = 'none';   // 隱藏空的提示訊息
    }

    // 插入收藏的店鋪
    for (const shopId in favorites) {
        const shop = favorites[shopId];
        const shopElement = document.createElement('div');
        shopElement.classList.add('favorite-item');
        shopElement.id = shopId;  // 為每個元素添加唯一的 ID
        shopElement.innerHTML = `
            <h3>${shop.name}</h3>
            <p>${shop.description}</p>
            <button onclick="removeFavorite('${shopId}')">Remove</button>
        `;
        container.appendChild(shopElement);
    }
};

// 移除收藏
function removeFavorite(shopId) {
  try {
    // 从 localStorage 获取收藏的店铺数据
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // 删除指定的店铺
    delete favorites[shopId];
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // 获取并删除该店铺的 DOM 元素，添加动画效果
    const shopElement = document.getElementById(shopId);
    if (shopElement) {
      shopElement.classList.add('fade-out');  // 添加动画效果
      shopElement.addEventListener('animationend', () => {
        shopElement.remove();  // 动画结束后移除元素
        // 若列表為空，也隱藏提示訊息
        if (Object.keys(favorites).length === 0) {
          document.getElementById('no-favorites-msg').style.display = 'block';
        }
      });
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}
