# ☕ 咖啡廳篩選與收藏平台

## 📌 專案簡介
這是一個以咖啡廳為主題的前端網頁平台，提供使用者透過關鍵字或標籤搜尋店家，並能將喜愛的店家加入自定分類的收藏清單中。支援拖曳互動、地圖顯示與資料儲存功能，提升收藏與探索體驗。

## 🔧 使用技術
- HTML5 / CSS3 / JavaScript
- Bootstrap（樣式設計）
- localStorage（儲存使用者收藏資料）
- jQuery（拖曳互動與事件處理）
- Leaflet.js （開源地圖套件，標示咖啡廳位置）

## 🧭 左側選單功能介紹

平台採用左側漢堡選單設計，包含以下功能頁面：

- **Log In**：登入頁面（可拓展帳號系統）
- **Home**：首頁推薦店家快速總覽
- **Shops**：店家瀏覽與篩選頁面
- **Favorites**：收藏清單管理與分類（支援拖曳）
- **Map**：地圖檢視功能，結合 Leaflet 標記店家位置
- **Contact Us**：聯絡表單頁面，提供使用者填寫意見

## 🎬 專案展示影片：[Cafind-咖啡廳篩選收藏網站](https://www.youtube.com/watch?v=9izN3tzFcEs&ab_channel=NiniLee)

## 🖼 專案畫面預覽

### 🔹 首頁畫面（Home）
背景為目前已收錄的咖啡廳圖片輪播，提供使用者視覺引導與品牌感。
中央設有導引按鈕，可直接跳轉至下方店家卡片區塊，快速展開探索。  
點擊 LOGO 為導覽快捷鍵，點擊即可隨時返回首頁，符合使用者操作直覺。

[首頁輪播]![image](https://github.com/user-attachments/assets/b679bbad-00bc-4208-a71c-991cab3d1dfd)


[首頁輪播2]![image](https://github.com/user-attachments/assets/2ea04b6e-6dec-4323-a48f-b1c1394513a4)


---

### 🔹 店家列表與標籤篩選（Shops）
所有店家以卡片形式呈現，支援關鍵字與標籤分類篩選，方便使用者快速找尋偏好空間類型。

[店家篩選畫面]![image](https://github.com/user-attachments/assets/065283d6-8f89-48ac-bf16-fc7d49b6ead9)
[使用搜尋功能]![image](https://github.com/user-attachments/assets/b09a6dbd-6e4e-4a74-ab5a-554b2a685d18)
[使用標籤功能-點擊甜點標籤]![image](https://github.com/user-attachments/assets/3379eadc-d8bc-40d9-ba20-ae62ff6dda0b)

---

### 🔹 店家詳細資訊頁（Modal）
點選任一店家卡片會開啟詳細資訊視窗，顯示店家地址、營業資訊與圖片輪播。  
收藏按鈕設於此視窗中，點擊後才會將該店家加入 Favorite 收藏頁。

[店家詳細資訊-點擊店家卡片展開，店內照片可切換]![image](https://github.com/user-attachments/assets/4542f23c-585b-422b-b0ee-101850276bb5)
[加入收藏-點擊詳細資料頁愛心圖示]![image](https://github.com/user-attachments/assets/b1880602-ee71-48be-ad93-7542959c2a93)

---

### 🔹 收藏清單與拖曳互動（Favorites）
可自訂分類並拖曳卡片進行收藏管理，可建立群組，資料會儲存在 localStorage 中，下次瀏覽仍會保留。
(此功能建議觀看影片更清楚)
[收藏清單-收藏後會進來此清單]![image](https://github.com/user-attachments/assets/8afeb121-02ed-41d7-8cdd-6015e369ede9)
[群組前-店家單獨呈現]![image](https://github.com/user-attachments/assets/b1e0ee2f-5139-45b3-a6b4-280823239cad)
[拖曳功能-由下方卡片移至上方卡片(可隨意拖曳組成群組)]![image](https://github.com/user-attachments/assets/5d92ce56-b98f-4a9b-b01d-34f7a023f9a0)
[群組後]![image](https://github.com/user-attachments/assets/62f4f159-9571-4720-95e6-fa75a7cd7f28)
[可直接點名稱兩下編輯群組名稱]![image](https://github.com/user-attachments/assets/114f1a6c-efd1-4a93-a335-be3ec9e4beaa)
[可直接透過上方輸入框新增群組]![image](https://github.com/user-attachments/assets/e7818feb-ff31-4bd2-9e57-3d4b494c246c)
[點擊 Remove 可解除群組，點擊 X 可移除卡片]![image](https://github.com/user-attachments/assets/0cfa4b6f-a3f2-4263-a89f-d9e950d32e72)
[移除群組後，卡片獨立存在]![image](https://github.com/user-attachments/assets/3eb45f4c-8473-45af-a590-f2a699da6156)


---

### 🔹 地圖顯示畫面（Map）
透過 Leaflet.js 顯示篩選後的咖啡廳地理位置，標記點可互動與補充資訊。

[固定中心點，並顯示出方圓500公尺內咖啡廳]![image](https://github.com/user-attachments/assets/900831f4-f540-4e21-b264-ec4478c92f8e)

---

### 🔹 聯絡我們（Contact Us）
提供簡易表單，使用者可輸入姓名、電子郵件與留言內容，作為回饋或合作諮詢的窗口。
[使用者與管理者溝通橋樑]![image](https://github.com/user-attachments/assets/eef58c73-35c4-4b41-834c-ba0ba5d6d3f3)
[送出後彈窗提示收到表單]![image](https://github.com/user-attachments/assets/a94734bb-9f44-42d3-98ba-8cd3e0b20eba)

