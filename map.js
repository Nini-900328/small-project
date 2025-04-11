document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // 固定中心：台中國家歌劇院
  var center = [24.163098, 120.640516];
  map.setView(center, 16);

  // 標記歌劇院中心位置（可以加 popup 說明）
  L.marker(center)
    .addTo(map)
    .bindPopup("台中國家歌劇院")
    .openPopup();

// 使用 Overpass API 搜尋附近 2000 公尺內的「咖啡廳」
var query = `
  [out:json];
  (
    node["amenity"="cafe"](around:500, 24.163098, 120.640516);
    way["amenity"="cafe"](around:500, 24.163098, 120.640516);
    relation["amenity"="cafe"](around:500, 24.163098, 120.640516);
  );
  out center;
`;


  fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
  })
    .then(response => response.json())
    .then(data => {
      data.elements.forEach(element => {
        const lat = element.lat || element.center?.lat;
        const lon = element.lon || element.center?.lon;
        const name = element.tags?.name || "未命名咖啡廳";

        if (lat && lon) {
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(name);
        }
      });
    })
    .catch(err => {
      console.error('Overpass API 錯誤:', err);
    });

  // 嘗試獲取使用者定位
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        L.marker([userLat, userLon], {
          icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          })
        })
          .addTo(map)
          .bindPopup("你的所在位置");
      },
      function (error) {
        console.warn("定位失敗:", error.message);
      }
    );
  } else {
    console.warn("此瀏覽器不支援地理定位");
  }
});
