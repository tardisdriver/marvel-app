<script>
import CharacterCards from "./CharacterCards";
import CharacterInfo from "./CharacterInfo";
import fullNameList from "../helpers/fullNames.json";
import { CircleLoader } from "@saeris/vue-spinners";
// import { getAllCharacters, getCharInfo, getRelated } from "../helpers/api";
import helperFunctions from "../helpers/api";

export default {
  name: "MainPage",
  components: { CharacterCards, CircleLoader, CharacterInfo },
  data() {
    return {
      name: "", // holds value for name entered in autocomplete search
      nameList: fullNameList, // set helper file to data
      alpha: "A",
      characterList: [],
      currentPage: 1,
      length: 26,
      loading: false,
      showCharInfo: false,
      selectedCharData: [],
      related: []
    };
  },
  methods: {
    handleBack() {
      console.log("here");
      this.showCharInfo = false;
    },
    async getCharacterCards() {
      this.loading = true;
      await helperFunctions.getAllCharacters(this.alpha).then(data => {
        this.characterList = data;
        this.loading = false;
      });
    },
    async handleSelection(id) {
      //   this.loading = true;
      await helperFunctions.getCharInfo(id).then(data => {
        this.selectedCharData = data;
      });
      let comicURI = this.selectedCharData.data.results[0].comics.items[0]
        .resourceURI;
      await helperFunctions.getRelated(comicURI, id).then(data => {
        let charList = [];
        console.log(data);
        for (let char of data) {
          let charName = char.name;
          let charImgURL = `${char.thumbnail.path}.${char.thumbnail.extension}`;
          charList.push({ charName, charImgURL });
        }
        this.related = charList;
        this.showCharInfo = true;
      });
    }
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
    }
  }
};
</script>
<template>
  <div>
    <header>
      <div class="headerContainer">
        <img class="marvelLogo" src="../assets/marvel-logo.png" alt="Marvel" />
        <div class="autoComBox">
          <v-autocomplete
            dark
            append-icon="mdi-magnify"
            v-model="name"
            label="Search"
            auto-select-first
            cache-items
            clearable
            :items="nameList"
          ></v-autocomplete>
        </div>
      </div>
    </header>
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
          <CharacterCards @update-selection="handleSelection" :characterList="characterList" />
        </div>
        <div v-else>
          <CharacterInfo @handleBack="handleBack" :data="selectedCharData.data" :related="related" />
        </div>
        <div v-if="!showCharInfo" class="paginationContainer">
          <v-pagination v-model="currentPage" dark :length="length"></v-pagination>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
.headerContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid black;
  background-color: black;
  padding: 0 1.5rem;
}
.marvelLogo {
  width: 175px;
  height: auto;
}
.autoComBox {
  width: 33vw;
}
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
