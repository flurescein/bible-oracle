<template>
  <span v-if="verse !== undefined">{{ verse }}</span>
  <Localized v-else phrase="loading" />
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
span {
  max-width: 1000px;
}

@media (orientation: landscape) {
  span {
    font-size: 32px;
  }
}

@media (orientation: portrait) {
  span {
    font-size: 24px;
  }
}
</style>
