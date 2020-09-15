import { commentService } from '../_services';
import {router} from '../router'

const state = {
    all: {}
}

let user = JSON.parse(localStorage.getItem('user'));

const actions = {

    getAll({ commit }, {food_id }) {
        commit('getAllRequest');
        commentService.getAll(food_id)
            .then(
                comments =>  commit('getAllSuccess', comments),
                error => commit('getAllFailure', error)
            );
    },

    add({ commit }, {food_id, content}){
        commentService.add(food_id, content)
            .then(
                comment => {
                    commit('addSuccess', comment)
                },
                error => {
                    router.push('/login');
                    commit('addFailure', error)
                }
            )
    },

    delete({ commit }, {id}){
        commit('deleteRequest', id);
        commentService.delete(id)
            .then(
                () =>commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            )
    },

    update({ commit }, {id, food_id}){
        commit('updateRequest', id);
        commentService.update(id, food_id)
            .then(
                comment =>commit('updateSuccess', comment),
                error => commit('updateFailure', { id, error: error.toString() })
            )
    }
};
const mutations = {

    getAllRequest(state) {
        state.all = { loading: true };
    },

    getAllSuccess(state, comments) {
        state.all = { items: comments };
    },

    getAllFailure(state, error) {
        state.all = { error };
    },

    addSuccess(state, comment) {
        let obj_cmt= {
            id: comment.id,
            user: {
                "id": user.id,
                "name": user.name
            },
            content: comment.content,
            created_at: comment.created_at,
        }
        state.all.items = [obj_cmt, ...state.all.items];
    },

    addFailure(state, error) {
        state.all = { error };
    },

    deleteRequest(state, id) {
        state.all.items = state.all.items.map(comment =>
            comment.id === id
                ? { ...comment, deleting: true }
                : comment
        )
    },

    deleteSuccess(state, id) {
        state.all.items = state.all.items.filter(comment => comment.id !== id)
    },

    deleteFailure(state, { id, error }) {
        state.all.items = state.all.items.map(comment => {
            if (comment.id === id) {
                const {...commentCopy } = comment;
                return { ...commentCopy, deleteError: error };
            }
            return comment;
        })
    },

    updateRequest(state, id) {
        state.all.items = state.all.items.map(comment =>
            comment.id === id
                ? { ...comment, updating: true }
                : comment
        )
    },

    updateSuccess(state, comment) {
        state.all.items = state.all.items.map(cmt => {
            if(comment.id === cmt.id){
                return {...cmt, content: comment.content}
            }
            return cmt
        })
    },
    
    updateFailure(state, { id, error }) {
        state.all.items = state.all.items.map(comment => {
            if (comment.id === id) {
                const {...commentCopy } = comment;
                return { ...commentCopy, updateError: error };
            }
            return comment;
        })
    },

};

export const comments = {
    namespaced: true,
    state,
    actions,
    mutations
};
