import Vue from 'vue'
import { uid , Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  tasks: {

  },
  search: '',
  sort: 'dueDate',
  tasksDownloaded: false
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  tasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  updateTask({ dispatch },payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask({ dispatch }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task,
    }
    dispatch('fbAddTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  },
  tasksDownloaded({ commit }, value) {
    commit('tasksDownloaded', value)
  },

  fbReadData({ commit }) { //? Firebaseからの読み取り
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userId)

    //* データ読み込み開始時
    userTasks.once('value', snapshot => {
      commit('tasksDownloaded', true)
    }, error => {
      showErrorMessage(error.message)
      this.$router.replace('/auth', () => {})
    })

    //* タスクの追加時
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    //* タスクの編集時
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    //* タスクの削除時
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task, error => {
      if(error){
        showErrorMessage(error.message)
      } else {
        Notify.create('保存を完了しました')
      }
    })
  },
  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates, error => {
      if(error) {
        showErrorMessage(error.message)
      } else {
        let keys = Object.keys(payload.updates)
        if(!(keys.includes('completed') && keys.length == 1)){
          Notify.create('編集を完了しました')
        }
      }
    })
  },
  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove(error => {
      if(error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('削除を完了しました')
      }
    })
  },
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks)

        keysOrdered.sort((a,b) => {
          let taskAprop = state.tasks[a][state.sort].toLowerCase(),
              taskBprop = state.tasks[b][state.sort].toLowerCase()

          if(taskAprop > taskBprop) return 1
          else if (taskAprop < taskBprop) return -1
          else return 0
        })

        keysOrdered.forEach(key => {
          tasksSorted[key] = state.tasks[key]
        })
    return tasksSorted
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted
    let tasksFiltered = {}
    if(state.search) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key],
            taskNameLowerCase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    let keys = Object.keys(tasksFiltered)
    keys.forEach(key => {
      let task = state.tasks[key]
      if(!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    let keys = Object.keys(tasksFiltered)
    keys.forEach(key => {
      let task = state.tasks[key]
      if(task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
