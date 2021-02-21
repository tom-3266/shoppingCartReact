import axios from "axios";

const instance = axios.create({
  baseURL: "https://wallpaper-cart-10809-default-rtdb.firebaseio.com/",
});

export default instance;
