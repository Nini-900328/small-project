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
      shopElement.setAttribute('draggable', true); // 使元素可拖曳
      shopElement.innerHTML = `
          <h3>${shop.name}</h3>
          <p>${shop.description}</p>
          <button onclick="removeFavorite('${shopId}')">Remove</button>
      `;
      shopElement.addEventListener('dragstart', handleDragStart);  // 設置拖曳事件
      container.appendChild(shopElement);
  }
};

// 拖曳開始事件處理函數
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

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

// 拖曳放置事件處理函數
document.getElementById('favorites-container').addEventListener('dragover', function(event) {
  event.preventDefault();  // 允許放置
});

document.getElementById('favorites-container').addEventListener('drop', function(event) {
  event.preventDefault();
  
  const draggedElementId = event.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(draggedElementId);

  if (draggedElement) {
    // 如果放置到分類組合區域中，添加到該組合
    const targetGroup = event.target.closest('.group');
    if (targetGroup) {
      const groupItems = targetGroup.querySelector('.group-items');
      groupItems.appendChild(draggedElement);
    } else {
      // 創建一個新的分類組合區塊
      const groupElement = document.createElement('div');
      groupElement.classList.add('favorite-item', 'group');
      groupElement.setAttribute('draggable', true);
      groupElement.innerHTML = `
          <h3 class="group-title" contenteditable="true">New Group</h3>
          <div class="group-items"></div>
          <button onclick="removeFavoriteGroup(this)">Remove Group</button>
      `;
      const groupItems = groupElement.querySelector('.group-items');
      groupItems.appendChild(draggedElement);
      
      // 使標題可編輯
      const title = groupElement.querySelector('.group-title');
      title.addEventListener('blur', function() {
        const newTitle = title.innerText.trim();
        if (!newTitle) {
          title.innerText = "New Group";
        }
      });

      // 把新的分組插入到容器中
      document.getElementById('favorites-container').appendChild(groupElement);
    }
  }
});

// 移除分類組合
function removeFavoriteGroup(button) {
  const groupElement = button.parentElement;
  groupElement.remove();
}

// 顯示新分類的輸入框
function showNewGroupInput() {
  const newGroupInputContainer = document.createElement('div');
  newGroupInputContainer.innerHTML = `
      <input type="text" id="new-group-name" placeholder="Enter new group name" />
      <button onclick="createNewGroup()">Create Group</button>
  `;
  document.body.appendChild(newGroupInputContainer);
}

// 創建新的分類組合
function createNewGroup() {
  const groupName = document.getElementById('new-group-name').value;
  if (groupName.trim()) {
    const groupElement = document.createElement('div');
    groupElement.classList.add('favorite-item', 'group');
    groupElement.innerHTML = `
        <h3 class="group-title" contenteditable="true">${groupName}</h3>
        <div class="group-items"></div>
        <button onclick="removeFavoriteGroup(this)">Remove Group</button>
    `;
    
    // 使標題可編輯
    const title = groupElement.querySelector('.group-title');
    title.addEventListener('blur', function() {
      const newTitle = title.innerText.trim();
      if (!newTitle) {
        title.innerText = "New Group";
      }
    });

    document.getElementById('favorites-container').appendChild(groupElement);
    document.body.removeChild(document.getElementById('new-group-name').parentElement);
  }
}
