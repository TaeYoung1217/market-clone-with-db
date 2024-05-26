const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const password = formData.get("password");
  const passwordcheck = formData.get("passwordcheck");
  if (password === passwordcheck) return true;
  else return false;
};

const handleSubmit = async (event) => {
  event.preventDefault(); //redirect 방지
  const formData = new FormData(form);
  const sha256password = sha256(formData.get("password")); //sha256 해시함수를 통해 비밀번호 암호화
  formData.set("password", sha256password);

  const div = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      //서버에 요청
      method: "post", //POST 메소드로
      body: formData, //body 에 formData를 담아서
    });
    const data = await res.json();

    if (data === "200") {
      alert("가입 성공");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 같지 않습니다";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
