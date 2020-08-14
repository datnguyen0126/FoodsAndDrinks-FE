import { foodService } from '../_services';


const state = {
    all: {}
}

const actions = {

    getAll({ commit }, { page }) {
        commit('getAllRequest');
        foodService.getAll(page)
            .then(
                res =>  commit('getAllSuccess', res),
                error => commit('getAllFailure', error)
            );
    },

    getDetail({ commit }, { id }){
        commit('getDetailRequest');
        foodService.getDetail(id)
            .then(
                res =>  commit('getDetailSuccess', res),
                error => commit('getDetailFailure', error)
            );
    },

    addRating({ commit }, { food_id, score }){
        foodService.ratingFood(food_id, score )
            .then(
                () =>  {
                    commit('addRatingSuccess')
                },
                error => commit('addRatingFailure', error)
            );
    },
    getByCategory({ commit }, { id }) {
        foodService.getByCategory(id)
            .then(
                res =>commit('getByCategorySuccess', res)
            )
    },
    getBySearch({ commit }, { q }){
        foodService.getbySearch(q)
            .then(
                res=>commit('getBySearchSuccess', res),
                error=>commit('getBySearchFailure', error)
            )
    }

};
const mutations = {

    getAllRequest(state) {
        state.all = { loading: true };
    },

    getAllSuccess(state, res) {
        state.all = { foods: res.listfoods, page_total: res.pagetotal, all: true };
    },

    getAllFailure(state, error) {
        state.all = { error };
    },

    getDetailRequest(state) {
        state.all = { loading: true };
    },

    getDetailSuccess(state, res) {
        state.all = { ...state.all, food: res };
    },

    getDetailFailure(state, error) {
        state.all = { ...state.all, error };
    },

    addRatingSuccess(state) {
        state.all = { ...state.all, rating: true };
    },

    addRatingFailure(state, error) {
        state.all = { ...state.all, error };
    },

    getByCategorySuccess(state, res) {
        state.all = { foods: res.listfoods };
    },

    getBySearchSuccess(state, res){
        console.log(res)
        state.all = { foods: res.results};
    }

};

export const foods = {
    namespaced: true,
    state,
    actions,
    mutations
};
