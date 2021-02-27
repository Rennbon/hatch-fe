import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import SecureLS from 'secure-ls';

let ls = new SecureLS({isCompression: false});


export const store = new Vuex.Store({
    state: {
        connected: false
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
            state.connected = connected

        }
    }
});


export default function useStore() {
    return store
}
