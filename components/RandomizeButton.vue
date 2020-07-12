<template>
  <img
    v-if="isVerseLoaded"
    class="randomize-button"
    src="~/static/refresh-arrow.svg"
    alt="Randomize"
    @click="randomizeVerse"
  />
  <img v-else class="spinner" src="~/static/spinner.svg" alt="Loading" />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: { ...mapState(['isVerseLoaded']) },
  methods: { ...mapActions(['randomizeVerse']) }
}
</script>

<style lang="scss" scoped>
img {
  user-select: none;
  height: 40px;
}

.randomize-button {
  cursor: pointer;
}

.spinner {
  animation: spin 1s infinite linear;
}

@media (orientation: portrait) {
  img {
    height: 35px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
