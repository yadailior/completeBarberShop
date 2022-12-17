import axios from "axios";
const MY_SERVER = "https://barbershop1.onrender.com";

export function upLoadPhoto(photoData) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "/posts/", photoData, {
        headers: {
          "Content-Type": "multipart/photoData",
        },
      })
      .then((res) => resolve(res))
  );
}

export function getPhoto() {
  return new Promise((resolve) =>
    axios.get(MY_SERVER + "/getImages").then((res) => resolve(res))
  );
}

export function deletePhoto(photoId) {
  // console.log(photoId);
  // console.log(`${MY_SERVER}/delPhoto/${photoId}`);

  return new Promise((resolve) =>
    axios.delete(`${MY_SERVER}/delPhoto/${photoId}`).then((res) => resolve(res))
  );
}
