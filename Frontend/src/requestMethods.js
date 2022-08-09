import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTc1NjExMWExNWIyMzlhZTc0MmZjYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTQ3OTE5NCwiZXhwIjoxNjU5NzM4Mzk0fQ.H4KW24W4vEeDRqx7gilmk9pk3zV5D1KIGidCtEmeuY0"
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});