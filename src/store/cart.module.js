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
                error => commit('updateCartFailure', error)
            );
    },

    updateCart({ commit }, { food_id, quantity }){
        cartService.updateCart(food_id, quantity)
            .then(
                () => commit('updateCartSuccess', { food_id, quantity }),
                error => commit('updateCartFailure', error)
            );
    },

    deleteCart({ commit }, { food_id }){
        cartService.deleteCart(food_id)
            .then(
                res => commit('deleteCartSuccess', res),
                error => commit('deleteCartFailure', error)
            );
    },
};

const mutations = {

    getCartRequest(state) {
        state.items = []
    },

    getCartSuccess(state, res) {
        Object.keys(res).forEach(key => {            
            state.items.push(res[key])
        })
    },

    getCartFailure(state, error) {
        state.items = [{ error }];
    },

    updateCartSuccess(state, { food_id, quantity }) {
        let currentItem = state.items.filter(item => item.food.id == food_id)[0];
        let index = state.items.indexOf(currentItem);
        currentItem.quantity = quantity;
        this.state.items[index] = currentItem;
    },

    updateCartFailure(state, error) {
        state.message = error
    },

    deleteCartSuccess(state, res) {
        let index = state.items.findIndex(item => item.food.id == res.id)        
        if (index > -1) {
            state.items.splice(index, 1);
        }
    },

    deleteCartFailure(state, error) {
        state.message = error
    },
};

export const cart = {
    namespaced: true,
    state,
    actions,
    mutations
};
