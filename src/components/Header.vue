<script>
import fullNameList from "../helpers/fullNames.json";
export default {
  name: "Header",
  data() {
    return {
      nameList: fullNameList, // set helper file to data
      name: "",
    };
  },
};
</script>
<template>
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
</style>
