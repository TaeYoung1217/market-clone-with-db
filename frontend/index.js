const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000; //세계시간과 한국시간 9시간 차이 보정 (ms기준)
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (min > 0) return `${min}분 전`;
  else if (sec >= 0) return `${sec}초 전`;
  else return "방금 전";
};

const rederData = (data) => {
  const main = document.querySelector("main");
  //최신 목록이 위로 올라오게 삽입된 DB데이터를 반대로 뒤집음
  data.forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imageDiv = document.createElement("div");
    imageDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    //html 생성 부분 시작
    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "item-list__info-title";
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "item-list__info-meta";
    InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "item-list__info-price";
    InfoPriceDiv.innerText = obj.price.toLocaleString() + "원";

    imageDiv.appendChild(img);
    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);

    div.appendChild(imageDiv);
    div.appendChild(InfoDiv);

    main.appendChild(div);

    //html 생성 부분 끝
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  rederData(data);
};

fetchList();
