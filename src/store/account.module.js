import { userService } from '../_services';
import { router } from '../router';

const user = JSON.parse(localStorage.getItem('user'));

const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });
    
        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    logout({ commit }) {
        userService.logout();
        commit('logout');
    },

    register({ dispatch, commit }, user) {
        commit('registerRequest');
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    change_password({ commit }, { current_password , new_password }){
        commit('changePasswordRequest');
        userService.change_password( current_password, new_password )
            .then(
                ()=> {
                    commit('changePasswordSuccess');
                    router.push('/profile');
                },
                error => commit('changePasswordFailure', error)
            )
    },

    update({ commit }, user){
        commit('updateRequest');
        userService.update(user)
            .then(
                ()=>{
                    commit('updateSuccess');
                },
                error => commit('updateFailure', error)
            )
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },

    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },

    loginFailure(state) {
        state.status = {};
        state.user = null;
    },

    logout(state) {
        state.status = {};
        state.user = null;
    },

    registerRequest(state) {
        state.status = { registering: true };
    },

    registerSuccess(state) {
        state.status = {};
    },

    registerFailure(state) {
        state.status = {};
    },

    changePasswordRequest(state) {
        state.status = { changing: true };
    },

    changePasswordSuccess(state) {
        state.status = {};
    },

    changePasswordFailure(state) {
        state.status = {};
    },

    updateRequest(state) {
        console.log("updating")
        state.status = { updating: true };
    },

    updateSuccess(state) {
        console.log("success")
        state.status = { updated: true };
        var myVar= setInterval(()=>{
            state.status = {}; 
            clearInterval(myVar);
        }, 3000);
    },
    
    updateFailure(state, error) {
        state.status = { deleteError: error };
    }

};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
