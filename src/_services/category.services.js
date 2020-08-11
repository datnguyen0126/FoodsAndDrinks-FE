import axios from 'axios';

export const categoryService = {
    getAll,
};

let url = process.env.VUE_APP_DJANGO_HOST;


function getAll() {
    return axios
        .get(`${url}/categories/`)
        .then(handleResponse)
}

function handleResponse(response) {
    
    return response.data;
}
    
