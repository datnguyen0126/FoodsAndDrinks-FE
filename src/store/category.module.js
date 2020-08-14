import { categoryService } from '../_services';

const state = {
    all: {}
}

const actions = {

    getAll({ commit }, {food_id }) {
        categoryService.getAll(food_id)
            .then(
                comments =>  commit('getAllSuccess', comments),
                error => commit('getAllFailure', error)
            );
    },
};
const mutations = {


};

export const comments = {
    namespaced: true,
    state,
    actions,
    mutations
};
