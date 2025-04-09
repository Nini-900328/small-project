function initMap() {
  // 初始化地圖的程式碼
  const mapOptions = {
    center: { lat: 24.1327292, lng: 120.6350788 }, // 初始地圖中心
    zoom: 14
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // 在這裡啟動定位
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(`目前位置: 緯度: ${lat}, 經度: ${lon}`);
      
      // 更新地圖的位置
      map.setCenter(new google.maps.LatLng(lat, lon));

      // 在當前位置放置標記
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map,
        title: "你的定位"
      });
    }, function (error) {
      console.error("定位失敗", error);
    }, {
      enableHighAccuracy: true, // 嘗試提高定位精度
      timeout: 5000, // 設定超時
      maximumAge: 0 // 確保每次獲取都是最新位置
    });
  }
}
