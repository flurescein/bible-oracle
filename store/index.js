import createPersistedState from 'vuex-persistedstate'

import translations from '~/static/translations.json'

export const state = () => ({
  verse: undefined,
  languages: ['russian', 'english'],
  currentLanguage: 'russian',
  translations
})

export const plugins = [createPersistedState({ paths: ['currentLanguage'] })]

export const mutations = {
  setLanguage(state, language) {
    state.currentLanguage = language
  },
  setVerse(state, verse) {
    state.verse = verse
  }
}

export const actions = {
  async randomizeVerse({ state: { currentLanguage }, commit }) {
    const localStorageKey = `${currentLanguage}Verses`

    let verses = localStorage.getItem(localStorageKey)

    if (verses === null) {
      verses = (await import(`~/static/bibles/${currentLanguage}.json`)).default
      localStorage.setItem(localStorageKey, JSON.stringify(verses))
    } else {
      verses = JSON.parse(verses)
    }

    const randomVerse = verses[Math.floor(Math.random() * verses.length)]

    commit('setVerse', randomVerse)
  },
  async switchLanguage({ commit, dispatch }, language) {
    commit('setLanguage', language)
    commit('setVerse', undefined)
    await dispatch('randomizeVerse')
  }
}
