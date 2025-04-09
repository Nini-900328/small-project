// 檢查是否按下 Enter 鍵來觸發搜尋
function checkEnter(event) {
    if (event.key === 'Enter') {
        submitSearch();
    }
}

// 處理搜尋功能
function submitSearch() {
    const searchQuery = document.querySelector('#search-box input').value;
    if (searchQuery.trim() !== '') {
        alert('Searching for: ' + searchQuery);
    }
}
// 搜尋功能 - 檢查關鍵字並過濾顯示
function submitSearch() {
    const searchTerm = document.querySelector('#search-box input').value.toLowerCase(); // 取得搜尋關鍵字
    const shops = document.querySelectorAll('.coffee-shop'); // 取得所有咖啡廳卡片

    shops.forEach(shop => {
        const shopName = shop.querySelector('h2').textContent.toLowerCase(); // 取得咖啡廳名稱
        const tags = shop.querySelectorAll('.tag'); // 取得所有標籤
        let matchFound = shopName.includes(searchTerm); // 初步匹配名稱

        // 檢查標籤是否與關鍵字匹配
        tags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }
        });

        // 根據是否找到匹配的內容顯示或隱藏咖啡廳
        shop.style.display = matchFound ? 'block' : 'none';
    });
}

// 按下 Enter 鍵觸發搜尋
function checkEnter(event) {
    if (event.key === 'Enter') {
        submitSearch();
    }
}



// 切換選單顯示/隱藏
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

