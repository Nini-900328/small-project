// 初始化 Firebase
  const firebaseConfig = {
    apiKey: "你的API",
    authDomain: "你的domain",
    ...
  };
  firebase.initializeApp(firebaseConfig);

  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        console.log("登入成功：", user.displayName);
        // 可以導向首頁或存資料
      }).catch(error => {
        console.error("登入錯誤：", error.message);
      });
  }
