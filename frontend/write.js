const handleSubmitForm = async (event) => {
  event.preventDefault();

  const body = new FormData(form); //form에 입력되있는 값을 body 변수에 받아옴
  body.append("insertAt", new Date().getTime()); //form에서 insertAt값을 따로 입력하지 않고 new Date().getTime()을 이용해 값을 가져와 body 뒷부분에 추가, 세계시간 기준!!
  try {
    //try-catch 이용 에러 잡는 동작
    const res = await fetch("/items", {
      method: "POST",
      body, //FormData는 현재 form에서 가지고 있는 key/value들로 채워
    });
    const data = await res.json();
    if (data === "200") window.location.pathname = "/"; //초기화면으로 이동하는 동작
  } catch (e) {
    console.error(e);
  }
};

const form = document.getElementById("write-form"); //폼에 입력된 내용 받아오기
form.addEventListener("submit", handleSubmitForm); //submit 이벤트 리스너 부착
