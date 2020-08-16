import Vue from "vue";
import Vuex from "vuex";
// import Axios from "axios";
import { alert } from './alert.module';
import { account } from './account.module';
import { comments } from './comment.module';
import { foods } from './food.module';
import { cart } from './cart.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        alert,
        foods,
        account,
        comments,
        cart
    },
})
