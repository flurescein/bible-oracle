<template>
  <span>{{ translations[phrase][currentLanguage] }}</span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    phrase: { type: String, required: true }
  },
  computed: {
    ...mapState(['translations', 'currentLanguage'])
  }
}
</script>
