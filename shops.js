// 顯示咖啡廳的詳細資訊
function showDetails(shopId) {
    document.getElementById('details-' + shopId).style.display = 'block';
  }
  
  // 關閉詳細資訊視窗
  function closeDetails(shopId) {
    document.getElementById('details-' + shopId).style.display = 'none';
  }
  