<script>
import CharacterCards from "./CharacterCards";
// import CharacterInfo from "./CharacterInfo";
// import fullNameList from "../helpers/fullNames.json";
import { CircleLoader } from "@saeris/vue-spinners";
import helperFunctions from "../helpers/api";

export default {
  name: "MainPage",
  components: { CharacterCards, CircleLoader },
  data() {
    return {
      name: "", // holds value for name entered in autocomplete search
      alpha: "A",
      characterList: [],
      currentPage: 1,
      length: 26,
      loading: false,
      showCharInfo: false,
      selectedCharData: [],
      related: [],
    };
  },
  methods: {
    async getCharacterCards() {
      this.loading = true;
      await helperFunctions.getAllCharacters(this.alpha).then((data) => {
        this.characterList = data;
        this.loading = false;
      });
    },
    async handleSelection(id) {
      await helperFunctions.getCharInfo(id).then((data) => {
        this.selectedCharData = data;
      });
      let comicURI = this.selectedCharData.data.results[0].comics.items[0]
        .resourceURI;
      await helperFunctions.getRelated(comicURI, id).then((data) => {
        let charList = [];
        for (let char of data) {
          let charName = char.name;
          let charImgURL = `${char.thumbnail.path}.${char.thumbnail.extension}`;
          charList.push({ charName, charImgURL });
        }
        this.related = charList;

        this.$router.push({
          name: "characterInfo",
          params: { id },
          query: { data: this.selectedCharData.data, related: this.related },
        });
      });
    },
  },
  mounted() {
    this.getCharacterCards();
  },
  watch: {
    currentPage: function() {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let letter = alphabet[this.currentPage - 1];
      this.alpha = letter;
      this.getCharacterCards();
    },
    name: function() {
      for (let char of this.characterList) {
        if (char.name === this.name) {
          this.handleSelection(char.id);
        }
      }
    },
  },
};
</script>
<template>
  <div>
    <main>
      <div class="pageContent">
        <h1>All Characters</h1>
        <CircleLoader
          v-if="loading"
          class="circleLoader"
          size="15"
          sizeUnit="rem"
          color="darkblue"
        />
        <div v-if="!showCharInfo" v-bind:class="{ loading: loading }">
          <CharacterCards
            @update-selection="handleSelection"
            :characterList="characterList"
          />
        </div>
        <div v-if="!showCharInfo" class="paginationContainer">
          <v-pagination
            v-model="currentPage"
            dark
            :length="length"
          ></v-pagination>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
.pageContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 3rem;
}
.paginationContainer {
  width: 30rem;
}
.circleLoader {
  position: absolute;
  top: 15rem;
}
.loading {
  opacity: 0.25;
}
</style>
