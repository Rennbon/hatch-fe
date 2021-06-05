import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import SecureLS from 'secure-ls';

let ls = new SecureLS({isCompression: false});


export const store = new Vuex.Store({
    state: {
        connected: false,
        account: "",
        balance: "",
        session: null,
        lastView: null,
    },
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },

    })],
    mutations: {
        updateConnected: (state, connected) => {
            console.log("store connected", connected)
            state.connected = connected
            state.lastView = new Date().getTime()
        },
        updateAccount: (state, account) => {
            console.log("store account", account)
            state.account = account
            state.lastView = new Date().getTime()
        },
        updateBalance: (state, balance) => {
            console.log("store balance", balance)
            state.balance = balance
            state.lastView = new Date().getTime()
        },
        updateSession: (state, session) => {
            console.log("store session", session)
            state.session = session
            state.lastView = new Date().getTime()
        }
    },
    getters: {
        getSession: (state) => {
            console.log("getSession", state.session)
            if (state.connected) {
                return state.session
            }
        }
    }
});


export default function useStore() {
    return store
}
