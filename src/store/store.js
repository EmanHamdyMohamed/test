import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        auth: false,
        username: 0,
        baseUrl: "http://localhost:52664/",
        user: {}
    },
    getters: {
        Auth(state) {
            return state.auth;
        },
        userName(state) {
            return state.username;
        },
        BaseUrl(state) {
            return state.baseUrl;
        },
        User(state) {
            return state.user;
        }
    },
    actions: {
        commitAuth({ commit }, data) {

            commit('setAuth', { data })
        },
        commitUserName({ commit }, data) {

            commit('setUserName', { data })
        },

        commitUser({ commit }, data) {

            commit('setUser', { data })
        }
    },
    mutations: {
        setAuth(state, auth) {
            // alert(auth.data)
            //console.log(auth)
            state.auth = auth.data;
        },
        setUserName(state, username) {
            //alert(username.data)
            state.username = username.data;
        },
        setUser(state, user) {
            //alert(username.data)
            state.user = user.data;
        }
    }
});