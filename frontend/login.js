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
  const data = await res.json();

  console.log("액세스토큰", data);

  if (res.status === 200) {
    //응답 성공 200
    alert("login success");
    window.location.pathname = "/";
  } else if (res.status === 401) {
    //응답 Unauthorized
    alert("check id or password");
  }
};

form.addEventListener("submit", handleSubmit);
