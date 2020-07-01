<template>
  <main>
    <Verse class="verse" />
    <footer>
      <LanguageSwitcher />
      <RandomizeButton />
    </footer>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

import Localized from '~/components/Localized.vue'
import Verse from '~/components/Verse.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import RandomizeButton from '~/components/RandomizeButton.vue'

export default {
  components: { Localized, Verse, LanguageSwitcher, RandomizeButton },
  methods: { ...mapActions(['randomizeVerse']) },
  mounted() {
    this.randomizeVerse()
  }
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.verse {
  flex: 1 0 auto;
  align-self: center;
}

footer {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
