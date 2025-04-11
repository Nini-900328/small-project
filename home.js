// 存放所有圖片的路徑
const images = [
    './photo/Liao.jpg',
    './photo/Liao2.jpg',
    './photo/Liao3.jpg',
    './photo/ATC1.jpg',
    './photo/ATC2.jpg',
    './photo/ATC3.jpg',
    './photo/Bluebird1.jpg',
    './photo/Bluebird2.jpg',
    './photo/ART1.jpg',
    './photo/ART2.jpg',
    './photo/71-1.jpg',
    './photo/71-2.jpg',
    './photo/71-3.jpg',
    './photo/Overture1.jpg',
    './photo/Overture2.jpg',
    './photo/Overture3.jpg'
];

// 這個函數會在頁面載入後顯示隨機圖片
function displayRandomImages() {
    const container = document.getElementById('slideshow-container');

    // 初始時隨機選擇一張圖片並生成 slide 元素
    const randomImage = getRandomImage();
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.style.backgroundImage = `url('${randomImage}')`;
    slide.style.opacity = 1; // 顯示初始圖片
    container.appendChild(slide);

    // 每隔 4 秒隨機更換圖片
    setInterval(() => {
        // 隨機選擇新圖片
        const randomImage = getRandomImage();
        const newSlide = document.createElement('div');
        newSlide.classList.add('slide');
        newSlide.style.backgroundImage = `url('${randomImage}')`;
        newSlide.style.opacity = 0; // 初始時讓新圖片透明

        // 顯示新圖片並添加過渡效果
        container.appendChild(newSlide);

        // 設置過渡效果
        setTimeout(() => {
            newSlide.style.transition = 'opacity 1s ease-in-out';
            newSlide.style.opacity = 1; // 讓新圖片逐漸顯示
        }, 100);

        // 隱藏舊圖片
        const slides = container.querySelectorAll('.slide');
        if (slides.length > 1) {
            const oldSlide = slides[0];
            oldSlide.style.transition = 'opacity 1s ease-in-out';
            oldSlide.style.opacity = 0; // 讓舊圖片逐漸隱藏

            // 刪除舊圖片
            setTimeout(() => {
                oldSlide.remove();
            }, 1000); // 在過渡後 1 秒刪除舊圖片
        }
    }, 5000);
}

// 隨機選擇圖片的函數
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

// 頁面載入完成後開始顯示圖片
window.onload = displayRandomImages;
