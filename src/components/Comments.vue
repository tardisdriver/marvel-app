<script>
import store from "../../store/store";

export default {
  name: "Comments",
  props: ["id"],
  data() {
    return {
      commenterName: "",
      commentBody: "",
      nameError: "",
      commentError: "",
      allComments: [],
    };
  },
  methods: {
    getComments() {
      let commentList = this.getCommentList;
      if (commentList.length) {
        this.allComments = commentList[this.id];
      }
    },
    submitComment() {
      if (!this.commenterName.length || !this.commentBody.length) {
        if (!this.commenterName.length) {
          this.nameError = "Please set a name.";
        }
        if (!this.commentBody.length) {
          this.commentError = "Comment is blank.";
        }
      } else {
        let payload = {
          id: this.id,
          name: this.commenterName,
          comment: this.commentBody,
        };
        store.commit("addNewComment", payload);
      }
      this.commenterName = "";
      this.commentBody = "";
      this.getComments();
    },
  },
  computed: {
    getCommentList() {
      return store.state.commentList;
    },
  },
  mounted() {
    this.getComments();
  },
};
</script>
<template>
  <section>
    <div class="commentsContainer">
      <h2>Comments</h2>
      <div class="comments">
        <v-form class="commentsForm">
          <v-text-field
            outlined
            v-model="commenterName"
            label="Your name"
            required
          ></v-text-field>
          <v-textarea
            outlined
            v-model="commentBody"
            label="Type your comment here"
            required
          ></v-textarea>
          <v-btn color="normal" @click="submitComment">Submit</v-btn>
        </v-form>
        <div class="allComments">
          <div v-if="!allComments.length">
            <span>No Comments Yet...Add One!</span>
          </div>
          <div v-else>
            <div
              class="singleComment"
              v-for="item of allComments"
              :key="item.ID"
            >
              <div class="commentHeader">
                <span>{{ item.name }}</span>
                <span>{{ item.timestamp }}</span>
              </div>
              <v-divider color="white"></v-divider>
              <div>{{ item.comment }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.commentsContainer {
  width: 80vw;
}
.comments {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.commentsForm {
  width: 45%;
}
.allComments {
  width: 45%;
}
.singleComment {
  border-radius: 0 20px 0 20px;
  background-color: rgb(80, 80, 80);
  color: white;
  padding: 1.5rem;
  margin-bottom: 1rem;
}
.commentHeader {
  display: flex;
  justify-content: space-between;
}
.commentHeader span:first-child {
  font-weight: bold;
}
.commentHeader span:nth-child(2) {
  font-size: 0.7rem;
}
</style>
