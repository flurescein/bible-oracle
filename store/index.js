import createPersistedState from 'vuex-persistedstate'

import translations from '~/static/translations.json'
import { bibleApiUrl } from '~/static/settings.json'

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
    try {
      const randomVerseResponse = await (
        await fetch(bibleApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            query: `{ randomVerse(language: "${currentLanguage}") { text } }`
          })
        })
      ).json()

      commit('setVerse', randomVerseResponse.data.randomVerse.text)
    } catch (error) {
      commit('setVerse', translations.error[currentLanguage])
    }
  },
  async switchLanguage({ commit, dispatch }, language) {
    commit('setLanguage', language)
    commit('setVerse', undefined)
    await dispatch('randomizeVerse')
  }
}
