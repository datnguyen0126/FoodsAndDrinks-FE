import Vue from "vue";
import VueRouter  from "vue-router";
import Home from "../views/Home";
import Detail from "../views/Detail"
import Login from "../views/Login"
import Register from "../views/Register"
import ChangePassword from "../views/ChangePassword"
import Profile from "../views/Profile"
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import OrderSummary from "../components/OrderSummary";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: Home },
        { path: "/food/:id",name: 'food_detail', component: Detail},
        { path: "/cart", name: "cart_page", component: Cart },
        { path: "/login",name: 'login_page', component: Login},
        { path: "/register",name: 'register_page', component: Register},
        { path: "/checkout", name: 'checkout_page', component: Checkout}, 
        { path: "/orderlist", name: 'order_list_page', component: OrderSummary}, 
        { path: "/profile/change_password",name: 'change_password_page', component: ChangePassword},
        { path: "/profile",name: 'profile', component: Profile},
        { path: "*", redirect: "/"}
    ]
})
