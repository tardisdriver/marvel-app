import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    commentList: [],
  },
  mutations: {
    addNewComment(state, payload) {
      let id = payload.id.toString();
      let timestamp = moment().format("M/D/YY h:mm A");
      let commentObj = {
        id,
        name: payload.name,
        comment: payload.comment,
        timestamp,
      };

      if (state.commentList[id]) {
        state.commentList[payload.id].unshift(commentObj);
      } else {
        state.commentList[id] = [commentObj];
      }
    },
  },
});

export default store;
