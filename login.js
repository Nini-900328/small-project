// 引入 Firebase SDK 模組
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// 初始化 Firebase
const firebaseConfig = {
    apiKey: "你的API",
    authDomain: "你的domain",
    // 其他配置項目
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google 登入
function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            console.log("登入成功：", user.displayName);
            // 可以導向首頁或存資料
        }).catch(error => {
            console.error("登入錯誤：", error.message);
        });
}

// Facebook 登入
function loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            console.log("Facebook 登入成功：", user.displayName);
        }).catch(error => {
            console.error("Facebook 登入錯誤：", error.message);
        });
}

// 監聽登入按鈕點擊事件
document.querySelector('.google-login-button').addEventListener('click', loginWithGoogle);
document.querySelector('.facebook-login-button').addEventListener('click', loginWithFacebook);
