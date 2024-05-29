<script>
  import { onMount } from "svelte";
  import Nav from "../components/Nav.svelte";
  import { getDatabase, ref, onValue } from "firebase/database";
  import { GoogleAuthProvider } from "firebase/auth/web-extension";

  let hour = new Date().getHours().toString().padStart(2, "0");
  let min = new Date().getMinutes().toString().padStart(2, "0");

  $: items = [];

  const db = getDatabase();
  const ItemsRef = ref(db, "items/");
  onMount(() =>
    //실시간으로 화면이 뜰때마다 다시 데이터를 가져오는
    onValue(ItemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    })
  );

  const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000; //세계시간과 한국시간 9시간 차이 보정 (ms기준)
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (min > 0) return `${min}분 전`;
    else if (sec >= 0) return `${sec}초 전`;
  };
</script>

<header>
  <div class="info-bar">
    <div class="info-bar_time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />

      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>

  <div class="menu-bar">
    <div class="menu-bar__location">
      역삼1동
      <img class="select-location" src="assets/arrow-down.svg" alt="화살표" />
    </div>

    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="검색" />
      <img src="assets/menu.svg" alt="메뉴" />
      <img src="assets/alert.svg" alt="알람" />
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img src={item.imgUrl} alt={item.title} srcset="" />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-price">
          {item.price.toLocaleString("ko-KR")}원
        </div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-description">{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<Nav location="home" />

<style>
</style>
