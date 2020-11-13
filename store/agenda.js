export const state = () => ({
  agenda: [],
  loaded: false
})

export const mutations = {
  save (state, agenda) {
    state.agenda = agenda
  },
}
