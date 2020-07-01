<template>
  <ul>
    <li v-for="(language, index) in languages" :key="index">
      <Localized
        v-if="language === currentLanguage"
        :phrase="language"
        class="selected"
      />
      <Localized
        v-else
        :phrase="language"
        @click.native="switchLanguage(language)"
        class="selectable"
      />
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Localized from '~/components/Localized.vue'

export default {
  components: { Localized },
  computed: { ...mapState(['languages', 'currentLanguage']) },
  methods: { ...mapActions(['switchLanguage']) }
}
</script>

<style lang="scss" scoped>
$selected-color: #878787;
$selectable-hover-color: #da2c2c;
$selectable-active-color: #ff4242;

ul {
  font-size: 32px;
  list-style-type: none;
  user-select: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline;
  &:not(:first-child):before {
    content: ' / ';
  }
}

.selected {
  color: $selected-color;
  cursor: default;
}

.selectable {
  cursor: pointer;

  &:hover {
    color: $selectable-hover-color;
  }

  &:active {
    color: $selectable-active-color;
  }
}

@media (orientation: landscape) {
  ul {
    font-size: 32px;
  }
}

@media (orientation: portrait) {
  ul {
    font-size: 24px;
  }
}
</style>
