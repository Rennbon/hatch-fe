import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import SecureLS from 'secure-ls';

let ls = new SecureLS({isCompression: false});


export const store = new Vuex.Store({
    state: {
        connected: false,
        account: "",
        balance: "",
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
        },
        updateAccount: (state, account) => {
            console.log("store account", account)
            state.account = account
        },
        updateBalance: (state, balance) => {
            console.log("store balance", balance)
            state.balance = balance
        }
    }
});


export default function useStore() {
    return store
}
