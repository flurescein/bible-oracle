import createPersistedState from 'vuex-persistedstate'

import translations from '~/static/translations.json'
import { randomVerseApiUrl } from '~/static/settings.json'

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
    const requestUrl = `${randomVerseApiUrl}?language=${currentLanguage}`
    let randomVerse
    try {
      randomVerse = await (await fetch(requestUrl)).json()
    } catch (error) {
      commit('setVerse', translations.error[currentLanguage])
    } finally {
      commit('setVerse', randomVerse.text)
    }
  },
  async switchLanguage({ commit, dispatch }, language) {
    commit('setLanguage', language)
    commit('setVerse', undefined)
    await dispatch('randomizeVerse')
  }
}
