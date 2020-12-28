export default {
    state: {
        value: 'my value'
    },
    getters: {
        value: state => {
            return state.value;
        }
    },
    mutations: {
        updateValue(state, payload) {
            state.value = payload;
        }
    },
    actions: {
        updateValue({commit}, payload) {
            commit('updateValue', payload);
        }
    }
};