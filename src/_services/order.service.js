import axios from "axios";
import { authHeader } from "../_helpers";

let be_url = process.env.VUE_APP_DJANGO_HOST;
const url = `${be_url}/order/`;

export const orderService = {
    getOrders,
    createOrder,
};

function getOrders() {
  return axios
    .get(url, {
      withCredentials: true,
      headers: authHeader(),
    })
    .then(handleResponse);
}

function createOrder(data) {
  return axios
    .post(url, data, {
      withCredentials: true,
      headers: authHeader(),
    })
    .then(handleResponse);
}

function handleResponse(response) {
  return response.data;
}
