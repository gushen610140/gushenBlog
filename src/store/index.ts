import {createStore} from "vuex";

export default createStore({
    state() {
        return {
            windowSize: window.innerWidth
        }
    },
    mutations: {
        setWindowSize(state, size) {
            state.windowSize = size
        }
    },
    actions: {

    },
    modules: {

    }
})