// map.js
document.addEventListener('DOMContentLoaded', function () {
  // 初始化地圖
  var map = L.map('map'); // 建立地圖容器

  // 加入 OpenStreetMap 圖層
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // 嘗試取得使用者位置
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // 使用者定位成功
      map.setView([lat, lon], 15);
      L.marker([lat, lon]).addTo(map)
        .bindPopup("目前位置")
        .openPopup();
    }, function (error) {
      console.error("定位失敗", error);
      fallbackLocation(); // 如果拒絕授權或錯誤就 fallback
    });
  } else {
    fallbackLocation(); // 不支援定位
  }

  // 預設 fallback 地點（例如台北）
  function fallbackLocation() {
    const fallbackLat = 25.038;
    const fallbackLon = 121.5645;
    map.setView([fallbackLat, fallbackLon], 13);
    L.marker([fallbackLat, fallbackLon]).addTo(map)
      .bindPopup('預設位置：台北某咖啡廳')
      .openPopup();
  }
});
