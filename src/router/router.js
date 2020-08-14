import Vue from "vue";
import VueRouter  from "vue-router";
import Home from "../views/Home";
import Detail from "../views/Detail"
import Login from "../views/Login"
import Register from "../views/Register"
import ChangePassword from "../views/ChangePassword"
import Profile from "../views/Profile"
import Cart from "../components/Cart";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: Home },
        { path: "/food/:id",name: 'food_detail', component: Detail},
        { path: "/cart", name: "cart_page", component: Cart },
        { path: "/login",name: 'login_page', component: Login},
        { path: "/register",name: 'register_page', component: Register},
        { path: "/profile/change_password",name: 'change_password_page', component: ChangePassword},
        { path: "/profile",name: 'profile', component: Profile},
        { path: "*", redirect: "/"}
    ]
})
