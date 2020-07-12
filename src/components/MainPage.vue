<script>
import crypto from "crypto";
import moment from "moment";
import CharacterCards from "./CharacterCards";
import fullNameList from "../helpers/fullNames.json";
import { CircleLoader } from "@saeris/vue-spinners";

export default {
  name: "MainPage",
  components: { CharacterCards, CircleLoader },
  data() {
    return {
      name: "", // holds value for name entered in autocomplete search
      nameList: fullNameList, // set helper file to data
      alpha: "A",
      characterList: [],
      currentPage: 1,
      length: 26,
      loading: false,
    };
  },
  methods: {
    getHash() {
      // creates hash for api call
      this.timestamp = moment().format("hmmss");
      let hash = crypto.createHash("md5");
      hash.setEncoding("hex");
      let toBeHashed =
        this.timestamp +
        process.env.VUE_APP_API_PRIVATE +
        process.env.VUE_APP_API_PUBLIC;
      hash.write(toBeHashed);
      hash.end();
      this.hash = hash.read();
    },
    async getCharacterCards() {
      this.loading = true;
      this.getHash();
      let baseUrl = `https://gateway.marvel.com/v1/public/characters?ts=${this.timestamp}&apikey=${process.env.VUE_APP_API_PUBLIC}&hash=${this.hash}&nameStartsWith=${this.alpha}&limit=100`;
      await fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
          let charList = [];
          for (let character of data.data.results) {
            let id = character.id;
            let imageURL = `${character.thumbnail.path}.${character.thumbnail.extension}`;
            let name = character.name;
            charList.push({ id, name, imageURL });
          }
          this.characterList = charList;
          this.loading = false;
        })
        .catch((error) => console.error(error));
    },
    async handleSelection(id) {
      this.getHash();
      let baseUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${this.timestamp}&apikey=${process.env.VUE_APP_API_PUBLIC}&hash=${this.hash}`;
      await fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //   let charList = [];
          //   for (let character of data.data.results) {
          //     let id = character.id;
          //     let imageURL = `${character.thumbnail.path}.${character.thumbnail.extension}`;
          //     let name = character.name;
          //     charList.push({ id, name, imageURL });
          //   }
          //   this.characterList = charList;
          //   this.loading = false;
        })
        .catch((error) => console.error(error));
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
  },
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
        <div v-bind:class="{ loading: loading }">
          <CharacterCards
            @update-selection="handleSelection"
            :characterList="characterList"
          />
        </div>
        <div class="paginationContainer">
          <v-pagination v-model="currentPage" dark :length="length">
          </v-pagination>
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
  padding: 1rem;
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
