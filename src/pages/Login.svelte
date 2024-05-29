<!-- <form id="login-form" action="/login" method="post">
  <div>로그인</div>
  <div>
    <label for="id">아이디</label>
    <input type="text" name="id" id="id" required />
  </div>
  <div>
    <label for="password">패스워드</label>
    <input type="password" name="password" id="password" required />
  </div>
  <div>
    <button type="submit">로그인</button>
  </div>
  <div id="info"></div>
</form> -->

<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);

      localStorage.setItem("token", token);
      window.location.hash = "/";
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div>
  <div>로그인</div>
  <button class="login-btn" on:click={loginWithGoogle}>
    <img
      class="google-icon"
      src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-1024.png"
      alt=""
      srcset=""
    />
    <div>Google로 로그인하기</div>
  </button>
</div>

<style>
  .login-btn {
    width: 160px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid gray;
    border-radius: 3px;
    cursor: pointer;
  }
  .google-icon {
    display: flex;
    width: 20px;
  }
</style>
