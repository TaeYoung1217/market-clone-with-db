<script>
  import Router from "svelte-spa-router";
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Mypage from "./pages/Mypage.svelte";
  import Nav from "./components/Nav.svelte";
  import "./css/style.css";
  import { user$ } from "./store";
  import {
    GoogleAuthProvider,
    getAuth,
    signInWithCredential,
  } from "firebase/auth";

  import { onMount } from "svelte";
  import Loading from "./pages/Loading.svelte";

  let isLoading = true;

  const auth = getAuth();

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return (isLoading = false); //토큰이 없으면(로그인 되어 있지 않으면)

    const credential = GoogleAuthProvider.credential(null, token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);

    isLoading = false;
  };

  const routes = {
    "/": Main,
    "/signup": Signup,
    "/write": Write,
    "/my": Mypage,
    "*": NotFound,
  };

  onMount(() => checkLogin()); //화면이 렌더링 될때마다 실행할 함수 : onMount()
</script>

<!-- 로그인 상태에 따른 페이지 이동 -->
{#if isLoading}
  <Loading />
{:else if !$user$}<!-- user$의 값을 가져올때 앞에 $ 표시 필수-->
  <Login />
{:else}
  <Router {routes} />
{/if}

<main></main>
