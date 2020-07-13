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
import { mapState, mapActions } from 'vuex'

import Verse from '~/components/Verse.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import RandomizeButton from '~/components/RandomizeButton.vue'

export default {
  components: { Verse, LanguageSwitcher, RandomizeButton },
  computed: { ...mapState(['translations', 'currentLanguage']) },
  methods: { ...mapActions(['randomizeVerse']) },
  mounted() {
    this.randomizeVerse()
  },
  head() {
    return {
      title: this.translations.title[this.currentLanguage],
      htmlAttrs: { lang: this.translations.lang[this.currentLanguage] }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  min-height: 100%;

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
