const state = {
  basic: '',
  spec: ''
}

const mutations = {
  GoodsBasic: (state, data) => {
    state.basic = data
  },
  GoodsSpec: (state, data) => {
    state.spec = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
