<template>
  <section>
    <span v-if="verse !== undefined">{{ verse }}</span>
    <Localized v-else phrase="loading" />
  </section>
</template>

<script>
import { mapState } from 'vuex'

import Localized from '~/components/Localized.vue'

export default {
  components: { Localized },
  computed: {
    ...mapState(['verse'])
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 1000px;
  display: flex;
  align-items: center;
  font-size: 38px;
}

@media (orientation: portrait) {
  section {
    font-size: 24px;
  }
}
</style>
