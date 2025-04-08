// map.js
document.addEventListener('DOMContentLoaded', function () {
    // 初始化地圖
    var map = L.map('map').setView([25.038, 121.5645], 13); // 設定初始地圖位置和縮放級別
  
    // 設定 OpenStreetMap 圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // 加入標註
    L.marker([25.038, 121.5645]).addTo(map)
      .bindPopup('某咖啡廳')
      .openPopup();
  });
  