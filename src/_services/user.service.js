import axios from 'axios';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    update,
    change_password,
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
    return axios
        .put(`${url}/api/user/profile`,{
            name: user.name,
            phone: user.phone,
            address: user.address,
        },{
            headers: authHeader()
        })
        .then(()=>{
            let obj = JSON.parse(localStorage.getItem('user'));
            obj.name = user.name
            obj.phone = user.phone
            obj.address = user.address 
            localStorage.setItem('user', JSON.stringify(obj));
        })
}
function change_password(current_password, new_password){
    return axios
        .post(`${url}/api/user/password/update`,{
            current_password,
            new_password
        },{
            headers: authHeader()
        })
        .then(handleResponse)
}

function handleResponse(response) {
    if (response.status === 401) {
        logout();
        location.reload(true);
    }
    return response.data;
}
