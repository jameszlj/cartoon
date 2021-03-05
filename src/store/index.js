import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recruitScrollY:0
  },
  getters: {
    recruitScrollY:state => state.recruitScrollY
  },
  mutations: {
    changeRecruitScrollY(state,recruitScrollY) { 
      state.recruitScrollY = recruitScrollY
    }
  },
  actions: {
 
  },
  modules: {}
});
