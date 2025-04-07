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

// 切換選單顯示/隱藏
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}
