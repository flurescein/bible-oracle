<template>
  <img
    src="~/static/refresh-arrow.svg"
    alt="Randomize"
    @click="randomizeVerse"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: { ...mapActions(['randomizeVerse']) }
}
</script>

<style lang="scss" scoped>
img {
  user-select: none;
  height: 40px;
}

@media (orientation: portrait) {
  img {
    height: 35px;
  }
}
</style>
