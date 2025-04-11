// 自動載入 share.html 進 shared-nav 容器，再執行其功能
fetch('share.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('shared-nav').innerHTML = html;

        // 等 HTML 插入後才啟用功能
        initSharedNavFeatures();
    });

function initSharedNavFeatures() {
    // 確保搜尋框存在
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('#search-box input');
    const hamburger = document.getElementById('hamburger');

    if (searchIcon && searchInput) {
        // 搜尋 icon 點擊事件
        searchIcon.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `shopspage.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });

        // 按 Enter 鍵觸發搜尋
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.trim();
                if (searchTerm) {
                    window.location.href = `shopspage.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });

        // 搜尋輸入時即時過濾
        searchInput.addEventListener('input', submitSearch);
    }

    // 漢堡選單
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
}

// 尋找關鍵字
function submitSearch() {
    const searchTerm = document.querySelector('#search-box input').value.toLowerCase();
    const shops = document.querySelectorAll('.coffee-shop');
    shops.forEach(shop => {
        const nameEl = shop.querySelector('h2');
        const name = nameEl?.textContent.toLowerCase() || '';
        const tags = shop.querySelectorAll('.tag');
        let match = false;

        if (name.includes(searchTerm)) {
            highlightSearchTerm(nameEl, searchTerm);
            match = true;
        } else {
            removeHighlight(nameEl);
        }

        tags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(searchTerm)) {
                highlightSearchTerm(tag, searchTerm);
                match = true;
            } else {
                removeHighlight(tag);
            }
        });

        shop.style.display = match ? 'block' : 'none';
    });
}

function highlightSearchTerm(el, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    el.innerHTML = el.textContent.replace(regex, `<span class="highlight">$1</span>`);
}

function removeHighlight(el) {
    el.innerHTML = el.textContent;
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', () => {
    // 讀取 URL 查詢參數中的 search 參數
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';

    if (searchTerm) {
        // 如果有搜尋關鍵字，執行搜尋過濾並高亮顯示
        highlightSearchResults(searchTerm);
    }
});

function highlightSearchResults(searchTerm) {
    const shops = document.querySelectorAll('.coffee-shop'); // 獲取所有咖啡店卡片

    shops.forEach(shop => {
        const nameEl = shop.querySelector('h2');
        const name = nameEl?.textContent.toLowerCase() || '';
        const tags = shop.querySelectorAll('.tag');
        let matchFound = false;

        // 檢查名稱是否符合
        if (name.includes(searchTerm)) {
            highlightSearchTerm(nameEl, searchTerm);
            matchFound = true;
        } else {
            removeHighlight(nameEl);
        }

        // 檢查標籤是否符合
        tags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(searchTerm)) {
                highlightSearchTerm(tag, searchTerm);
                matchFound = true;
            } else {
                removeHighlight(tag);
            }
        });

        // 顯示符合條件的店鋪
        shop.style.display = matchFound ? 'block' : 'none';
    });
}

function highlightSearchTerm(element, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    element.innerHTML = element.textContent.replace(regex, `<span class="highlight">$1</span>`);
}

function removeHighlight(element) {
    element.innerHTML = element.textContent; // 恢復原始文本
}
