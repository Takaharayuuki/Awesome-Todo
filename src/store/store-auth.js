import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

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
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      showErrorMessage(error.message) //? エラーダイアログを使用してエラーを表示
    })
  },
  loginUser({}, payload) { //? ログイン機能 FirebaseAPI Auth => メソッド signInWithEmailAndPassword
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      showErrorMessage(error.message) //? エラーダイアログを使用してエラーを表示
    })
  },
  logoutUser() { //? ログアウト機能 FirebaseAPI Auth => メソッド signOut
    firebaseAuth.signOut()
    console.log('test');
  },
  handleAuthStateChange({ commit }) { //? ログイン状態の保持 FirebaseAPI Auth => メソッド onAuthStateChanged
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
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
