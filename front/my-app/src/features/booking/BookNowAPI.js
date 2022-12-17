import axios from "axios";
const MY_SERVER = "https://barbershop1.onrender.com";

export function date(Date) {
  // console.log(Date)
  return new Promise((resolve) =>
    axios.post(MY_SERVER + "/date", Date).then((res) => resolve(res))
  );
}

export function booking(data, token) {
  // console.log(data);
  // console.log(token);

  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "/booking", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
      
  );
}

export function getbooking(token) {
  // console.log(token);

  return new Promise((resolve) =>
    axios
      .get(MY_SERVER + "/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
  );
}

export function deleteBooking(booking_id, token) {
  // console.log(token);

  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "/cancle_book", booking_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
  );
}

export function getCalendar() {
  // console.log(token);

  return new Promise((resolve) =>
    axios
      .get(MY_SERVER + "/getCalendar")
      .then((res) => resolve(res))
  );
}
