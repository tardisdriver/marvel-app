<script>
import CharacterCard from "./CharacterCard";

export default {
  name: "CharacterCards",
  props: ["characterList"],
  components: { CharacterCard },
  methods: {
    handleSelection(e) {
      this.$emit("update-selection", e);
    }
  }
};
</script>
<template>
  <section>
    <div class="cardsContainer">
      <CharacterCard
        v-for="char of characterList"
        :key="char.ID"
        :charInfo="char"
        @update-selection="handleSelection"
      />
    </div>
  </section>
</template>
<style scoped>
.cardsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 70vh;
  overflow-y: scroll;
}
</style>
