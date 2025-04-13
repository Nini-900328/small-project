// 引入 Firebase SDK 模組
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAC-HVYDd-Zr8wg-RErqCfK4hWal4Wh00g",
    authDomain: "project1-7839a.firebaseapp.com",
    projectId: "project1-7839a",
    storageBucket: "project1-7839a.firebasestorage.app",
    messagingSenderId: "728779602427",
    appId: "1:728779602427:web:cd65a900bf9e035db2335e",
    measurementId: "G-GRMX4NS8YR"
};

// ✅ 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Google 登入
function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      alert(`歡迎登入，${user.displayName}！`);
    })
    .catch(error => {
      if (error.code === 'auth/popup-closed-by-user') {
        alert('您已關閉登入視窗，請再次嘗試登入！');
      } else {
        console.error("Google 登入錯誤：", error.message);
        alert("Google 登入失敗，請稍後再試！");
      }
    });
}

// ✅ Facebook 登入
function loginWithFacebook() {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      alert(`歡迎登入，${user.displayName}！`);
    })
    .catch(error => {
      if (error.code === 'auth/popup-closed-by-user') {
        alert('您已關閉登入視窗，請再次嘗試登入！');
      } else {
        console.error("Facebook 登入錯誤：", error.message);
        alert("Facebook 登入失敗，請稍後再試！");
      }
    });
}

// ✅ 綁定按鈕事件
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.google-login-button').addEventListener('click', loginWithGoogle);
  document.querySelector('.facebook-login-button').addEventListener('click', loginWithFacebook);
});
