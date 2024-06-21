<script>
  import Nav from "../components/Nav.svelte";
  import { user$ } from "../store";

  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<div class="wrapper">
  <div>나의 당근</div>
  <button on:click={logout}>로그아웃</button>
  <Nav location="my"></Nav>
</div>

<style>
  button {
    cursor: pointer;
    border: 1px solid gray;
    margin-top: 10px;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
  }
</style>
