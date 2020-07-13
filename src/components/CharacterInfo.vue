<script>
import Comments from "./Comments";
export default {
  name: "CharacterInfo",
  components: { Comments },
  data() {
    return {
      data: [],
      related: [],
      seriesColumns: false,
      eventsColumns: false,
      loading: false,
    };
  },
  beforeMount() {
    this.data = this.$route.query.data;
    this.related = this.$route.query.related;
  },
};
</script>
<template>
  <section>
    <router-link to="/">
      <v-btn color="primary"> <v-icon>mdi-arrow-left-thick</v-icon>Back </v-btn>
    </router-link>
    <h1>{{ data.results[0].name }}</h1>

    <div class="characterContainer">
      <div class="charImgWrap">
        <img
          class="characterImg"
          :src="
            data.results[0].thumbnail.path +
              '.' +
              data.results[0].thumbnail.extension
          "
          :alt="data.results[0].name"
        />
      </div>
      <div class="characterContent">
        <h2>Description</h2>
        <v-divider color="black"></v-divider>
        <span v-if="data.results[0].description.length">
          {{ data.results[0].description }}
        </span>
        <span v-else>No description available</span>
        <h2>Series Appearances</h2>
        <v-divider color="black"></v-divider>
        <v-list v-bind:class="{ characterList: seriesColumns }">
          <v-list-item
            class="listItem"
            v-for="item in data.results[0].series.items"
            :key="item.ID"
            >{{ item.name }}</v-list-item
          >
        </v-list>
        <h2>Notable Events</h2>
        <v-divider color="black"></v-divider>
        <v-list
          v-if="data.results[0].events.items.length"
          v-bind:class="{ characterList: eventsColumns }"
        >
          <v-list-item
            class="listItem"
            v-for="item in data.results[0].events.items"
            :key="item.ID"
            >{{ item.name }}</v-list-item
          >
        </v-list>
        <span v-else>No event information available</span>
      </div>
    </div>
    <div class="relatedContainer">
      <h2>Related Characters</h2>
      <div class="relatedChars">
        <div v-for="char of related" class="related" :key="char.ID">
          <div class="relatedItem">
            <img
              class="relatedImg"
              :src="char.charImgURL"
              :alt="char.charName"
            />
            <span>{{ char.charName }}</span>
          </div>
        </div>
      </div>
    </div>
    <Comments :id="data.results[0].id" />
  </section>
</template>
<style scoped>
.circleLoader {
  position: absolute;
  top: 15rem;
  left: 30vw;
}
.characterContainer {
  display: flex;
}
.characterContent {
  width: 55%;
  margin: auto;
  text-align: justify;
}
.charImgWrap {
  display: flex;
  filter: drop-shadow(-12px 9px 5px rgba(30, 30, 30, 0.5));
}
.characterImg {
  width: 20rem;
  transform: translate(-10px, 0px);
  clip-path: polygon(0 0, 100% 10%, 100% 88%, 0% 100%);
  border: 1px solid grey;
}
.characterList {
  column-count: 2;
}
.listItem {
  min-height: 0;
  padding: 0;
}
.relatedContainer {
  margin: 1.5rem 0;
}
.relatedChars {
  display: flex;
  overflow-x: scroll;
  width: 73vw;
  margin: auto;
}
.relatedItem {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.relatedImg {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 10px;
}
@media only screen and (max-width: 700px) {
  .characterContainer {
    flex-direction: column;
  }
}
</style>
