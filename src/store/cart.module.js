import { cartService } from '../_services';

const state = {
    items: [],
    message: ""
}

const actions = {

    getCart({ commit }) {
        commit('getCartRequest');
        cartService.getCart()
            .then(
                res =>  commit('getCartSuccess', res),
                error => commit('getCartFailure', error)
            );
    },

    addCart({ commit }, { food_id, quantity }){
        cartService.addCart(food_id, quantity)
            .then(
                res => commit('changeCartSuccess', res),
                error => commit('changeCartFailure', error)
            );
    },

    updateCart({ commit }, { food_id, quantity }){
        cartService.updateCart(food_id, quantity)
            .then(
                res => commit('changeCartSuccess', res),
                error => commit('changeCartFailure', error)
            );
    },

    deleteCart({ commit }, { food_id }){
        cartService.deleteCart(food_id)
            .then(
                res => commit('changeCartSuccess', res),
                error => commit('changeCartFailure', error)
            );
    },
};
const mutations = {

    getCartRequest(state) {
        state.items = []
    },

    getCartSuccess(state, res) {
        Object.keys(res).forEach(key => {
            let data = {
                food_id: key,
                price: res[key].price,
                quantity: res[key].quantity
            }
            state.items.push(data)
        })
    },

    getCartFailure(state, error) {
        state.items = [{ error }];
    },

    changeCartSuccess(state, res) {
        state.message = res
    },

    changeCartFailure(state, error) {
        state.message = error
    },
};

export const cart = {
    namespaced: true,
    state,
    actions,
    mutations
};