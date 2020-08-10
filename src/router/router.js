import Vue from "vue";
import VueRouter  from "vue-router";
import Home from "../views/Home";
import Detail from "../views/Detail"
import Login from "../views/Login"
import Register from "../views/Register"

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: Home },
        { path: "/food/:id",name: 'food_detail', component: Detail},
        { path: "/login",name: 'login_page', component: Login},
        { path: "/register",name: 'register_page', component: Register},
        { path: "*", redirect: "/"}
    ]
})
