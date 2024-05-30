<script>
  import { getDatabase, ref, push } from "firebase/database";
  import imageCompression from "browser-image-compression";

  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import Nav from "../components/Nav.svelte";
  import { loc } from "svelte-spa-router";

  const storage = getStorage();
  const db = getDatabase();

  // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, files).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });

  let title;
  let price;
  let description;
  let place;
  let files;

  async function writeUserData(imgUrl) {
    push(ref(db, "items/"), {
      title,
      price,
      description,
      place,
      insertAt: new Date().getTime(),
      imgUrl,
    });
    alert("글쓰기완료");
    window.location.hash = "/";
  }

  const uploadFile = async () => {
    const file = files[0];
    const imgRef = refImage(storage, file.name);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };

  const handleSubmit = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <input type="file" id="image" name="image" bind:files />
  </div>

  <div>
    <label for="title">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>

  <div>
    <label for="price">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>

  <div>
    <label for="description">설명</label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>

  <div>
    <label for="place">장소</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>

  <div>
    <button class="write-button" type="submit" on:click={uploadFile}>
      글쓰기 완료
    </button>
  </div>
</form>

<Nav location="write" />

<style>
  .write-button {
    background-color: rgb(254, 111, 15);
    margin: 10px;
    padding: 5px 12px 5px 12px;
    color: white;
    cursor: pointer;
    border-radius: 10px;
  }
</style>
