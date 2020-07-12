<script>
export default {
  name: "CharacterCard",
  props: ["charInfo"],
  methods: {
    handleSelection() {
      this.$emit("update-selection", this.charInfo.id);
    },
  },
};
</script>
<template>
  <div class="cardItem" @click="handleSelection">
    <img class="thumbnail" :src="charInfo.imageURL" :alt="charInfo.name" />
    <span class="thumbnailText">{{ charInfo.name }}</span>
  </div>
</template>
<style scoped>
.cardItem {
  display: flex;
  flex-direction: column;
  box-shadow: -6px 6px 5px 0px rgba(0, 0, 0, 0.36);
  margin: 1rem;
  cursor: pointer;
}
.thumbnail {
  height: 275px;
  width: 250px;
}
.thumbnailText {
  text-align: center;
  display: block;
  padding: 0.5rem;
}
</style>
