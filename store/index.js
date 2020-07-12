import createPersistedState from 'vuex-persistedstate'

import translations from '~/static/translations.json'
import { bibleApiUrl } from '~/static/settings.json'

export const state = () => ({
  verse: undefined,
  isVerseLoaded: false,
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
  },
  setIsVerseLoaded(state, isLoaded) {
    state.isVerseLoaded = isLoaded
  }
}

export const actions = {
  async randomizeVerse({ state: { currentLanguage }, commit }) {
    commit('setIsVerseLoaded', false)

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
    } finally {
      commit('setIsVerseLoaded', true)
    }
  },
  async switchLanguage({ commit, dispatch }, language) {
    commit('setLanguage', language)
    commit('setVerse', undefined)
    await dispatch('randomizeVerse')
  }
}
