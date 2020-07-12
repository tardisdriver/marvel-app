<script>
import fullNameList from "../helpers/fullNames.json";
export default {
  name: "MainPage",
  data() {
    return {
      name: "", // holds value for name entered in autocomplete search
      nameList: fullNameList, // set helper file to data
    };
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
</style>
