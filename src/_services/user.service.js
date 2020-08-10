import axios from 'axios';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    update,
};

let url = process.env.VUE_APP_DJANGO_HOST;

function login(email, password) {
    return axios
        .post(`${url}/api/auth/login`, { email, password })
        .then(handleResponse)
        .then(user => {
            if (user.auth_token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    return  axios
        .post(`${url}/api/user/register`, {
            name: user.name,
            email: user.email,
            password: user.password,
        })
        .then(handleResponse);
    }

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`users/${user.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.status === 401) {
        logout();
        location.reload(true);
    }
    return response.data;
}
