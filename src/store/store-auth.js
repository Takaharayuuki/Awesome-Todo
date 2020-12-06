import { LocalStorage } from 'quasar'
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
  registerUser({}, payload) { //? 新規会員登録機能 FirebaseAPI Auth => メソッド createUserWithEmailAndPassword
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('error.message:', error.message);
    })
  },
  loginUser({}, payload) { //? ログイン機能 FirebaseAPI Auth => メソッド signInWithEmailAndPassword
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('error.message:', error.message);
    })
  },
  logoutUser() { //? ログアウト機能 FirebaseAPI Auth => メソッド signOut
    firebaseAuth.signOut()
    console.log('test');
  },
  handleAuthStateChange({ commit }) { //? ログイン状態の保持 FirebaseAPI Auth => メソッド onAuthStateChanged
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/', ()=>{})
      }
      else {
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth', () => {})
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
