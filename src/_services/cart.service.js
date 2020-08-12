import axios from "axios";
import { authHeader } from "../_helpers";

let be_url = process.env.VUE_APP_DJANGO_HOST;
const url = `${be_url}/cart/`;

export const cartService = {
    getCart,
    addCart,
    updateCart,
    deleteCart
};

function getCart() {
  return axios
    .get(url, {
      withCredentials: true,
      headers: authHeader(),
    })
    .then(handleResponse);
}

function addCart(food_id, quantity) {
  let data = {
    food_id: food_id,
    quantity: quantity,
  };
  return axios
    .post(url, data, {
      withCredentials: true,
      headers: authHeader(),
    })
    .then(handleResponse);
}

function updateCart(food_id, quantity) {
  let data = {
    quantity: quantity,
  };
  return axios
    .put(`${url}/${food_id}/`, data, {
      withCredentials: true,
      headers: authHeader(),
    })
    .then(handleResponse);
}

function deleteCart(food_id) {
  return axios
    .delete(`${url}/${food_id}/`, {
      withCredentials: true,
      headers: authHeader(),
    })
    .then(handleResponse);
}

function handleResponse(response) {
  return response.data;
}
