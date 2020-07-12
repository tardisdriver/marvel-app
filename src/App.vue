<script>
import MainPage from "./components/MainPage";

export default {
  name: "App",

  components: {
    MainPage,
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-app>
    <v-content>
      <MainPage />
    </v-content>
  </v-app>
</template>
