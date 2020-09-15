import axios from 'axios';
import { authHeader } from '../_helpers';

export const foodService = {
    getAll,
    getDetail,
    ratingFood,
    getByCategory,
    getbySearch
};

let url = process.env.VUE_APP_DJANGO_HOST;

function getAll(page) {
    return axios
        .get(`${url}/foods/public?page=${page}`)
        .then(handleResponse)
}

function getDetail(id) {
    return axios
        .get(`${url}/foods/${id}/`)
        .then(handleResponse)
}

function ratingFood(food_id, score) {
    return axios
        .post(`${url}/foods/rating/`, {
            food_id,
            score
        }, {
            headers: authHeader()
        })
        .then(handleResponse)
}

function getByCategory(id) {
    return axios
        .get(`${url}/foods/public/${id}`)
        .then(handleResponse)
}

function getbySearch(q) {
    return axios
        .post(`${url}/search`, { q })
        .then(handleResponse)
}

function handleResponse(response) {
    return response.data;
}
