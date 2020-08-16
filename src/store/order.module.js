import { orderService } from '../_services';

const state = {
    orders: [],
    message: ""
}

const actions = {

    getOrders({ commit }) {
        commit('getOrderRequest');
        orderService.getOrders()
            .then(
                res =>  commit('getOrderSuccess', res),
                error => commit('getOrderFailure', error)
            );
    },

    createOrder({ commit }, { data }){
        orderService.addCart(data)
            .then(
                error => commit('createOrderFailure', error)
            );
    },
};

const mutations = {

    getCartRequest(state) {
        state.orders = []
    },

    getOrderSuccess(state, res) {
        Object.keys(res).forEach(key => {            
            state.orders.push(res[key])
        })
    },

    getOrderFailure(state, error){
        state.message = error
    }
};

export const order = {
    namespaced: true,
    state,
    actions,
    mutations
};
