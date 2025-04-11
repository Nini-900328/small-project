// 搜尋功能：按下 Enter 鍵觸發搜尋
document.querySelector('#search-box input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitSearch();
    }
});

// 處理搜尋功能：依據名稱或標籤顯示相符的卡片
function submitSearch() {
    const searchTerm = document.querySelector('#search-box input').value.toLowerCase();
    const shops = document.querySelectorAll('.coffee-shop'); // 卡片 class 請確保是 .coffee-shop

    shops.forEach(shop => {
        const shopName = shop.querySelector('h2')?.textContent.toLowerCase() || '';
        const tags = shop.querySelectorAll('.tag');
        let matchFound = shopName.includes(searchTerm);

        tags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(searchTerm)) {
                matchFound = true;
            }
        });

        shop.style.display = matchFound ? 'block' : 'none';
    });
}

// 切換漢堡選單顯示
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

// 輪播背景圖片功能
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
    });
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 4000);
