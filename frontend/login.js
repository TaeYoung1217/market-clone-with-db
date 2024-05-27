const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256password = sha256(formData.get("password")); //sha256 해시함수를 통해 비밀번호 암호화
  formData.set("password", sha256password);

  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });
  //////
  const accessToken = await res.json(); //서버에서 return value가 accesstoken을 반환함
  console.log(accessToken);
  window.localStorage.setItem("token", accessToken);
  alert("login success");
  //로컬스토리지 저장하면 브라우저 껐다켜도 저장되어 있음
  //window.sessionStorage.setItem("token", accessToken);
  //세션스토리지 브라우저 껐다 켜면 삭제됨
  const infoDiv = document.querySelector("#info");
  infoDiv.innerText = "로그인 성공";

  window.location.pathname = "/";
};

form.addEventListener("submit", handleSubmit);
