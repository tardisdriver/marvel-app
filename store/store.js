import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    commentList: {
      "1017100": [{ id: 1017100, name: "test", comment: "test test test" }],
    },
  },
  mutations: {
    addNewComment(state, payload) {
      let timestamp = moment().format("M/D/YY h:mm A");
      let commentObj = {
        id: payload.id,
        name: payload.name,
        comment: payload.comment,
        timestamp,
      };
      state.commentList[payload.id].unshift(commentObj);
    },
  },
});

export default store;
