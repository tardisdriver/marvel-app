<script>
import fullNameList from "../helpers/fullNames.json";
export default {
  name: "MainPage",
  data() {
    return {
      name: "", // holds value for name entered in autocomplete search
      nameList: fullNameList // set helper file to data
    };
  }
};
</script>
<template>
  <div>
    <header>
      <div class="headerContainer">
        <img class="marvelLogo" src="../assets/marvel-logo.png" alt="Marvel" />
        <v-autocomplete
          class="autoComBox"
          v-model="name"
          label="Search"
          auto-select-first
          cache-items
          clearable
          :items="nameList"
        ></v-autocomplete>
      </div>
    </header>
  </div>
</template>
<style scoped>
.headerContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.marvelLogo {
  width: 100px;
}
</style>