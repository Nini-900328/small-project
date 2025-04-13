document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
      event.preventDefault(); // 阻止預設送出行為

      // 這裡你可以加入實際寄信邏輯，例如送出至後端或第三方API
      // 目前我們只是簡單顯示成功訊息
      alert('訊息已寄出！謝謝您的聯絡 😊');

      // 清空表單
      form.reset();
  });
});
