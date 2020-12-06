import { firebaseAuth } from 'boot/firebase'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser({}, payload) { //? 新規会員登録機能
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('error.message:', error.message);
    })
  },
  loginUser({}, payload) { //? ログイン機能
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('error.message:', error.message);
    })
  },
  handleAuthStateChange({ commit }) { //? ログイン状態の保持 Auth =>
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        commit('setLoggedIn', true)
      }
      else {
        commit('setLoggedIn', false)
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
