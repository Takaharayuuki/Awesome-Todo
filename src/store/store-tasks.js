import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    'ID1': {
      name: 'Go to Shop',
      completed: false,
      dueDate: '2020/11/24',
      dueTime: '14:00'
            },
    'ID2': {
      name: 'Get Banana',
      completed: false,
      dueDate: '2020/11/25',
      dueTime: '16:00'
    },
    'ID3': {
      name: 'Get Apples',
      completed: false,
      dueDate: '2020/11/26',
      dueTime: '20:00'
    },
  },
  search: '',
  sort: 'dueDate'
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
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  }
}

const actions = {
  updateTask({ commit },payload) {
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task,
    }
    commit('addTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  }
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
