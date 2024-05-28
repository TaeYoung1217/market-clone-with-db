<script>
  let hour = new Date().getHours();
  let min = new Date().getMinutes();
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
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<Footer></Footer>

<style>
  .info-bar_time {
    color: red;
  }
</style>
