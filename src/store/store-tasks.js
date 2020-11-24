import Vue from 'vue'

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
  }
  // tasks: [
  //   {
  //     id: 1,
  //     name: 'Go to Shop',
  //     completed: false,
  //     dueDate: '2020/11/24',
  //     dueTime: '14:00'
  //   },
  //    {
  //     id: 2,
  //     name: 'Get banana',
  //     completed: false,
  //     dueDate: '2020/11/25',
  //     dueTime: '16:00'
  //    },
  //    {
  //     id: 3,
  //     name: 'Get Apples',
  //     completed: false,
  //     dueDate: '2020/11/26',
  //     dueTime: '20:00'
  //   },
  // ]
}

const mutations = {
  updateTask(state, payload) {
    console.log(payload);
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    console.log(id);
    Vue.delete(state.tasks, id)
  }

}

const actions = {
  updateTask({ commit },payload) {
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  }
}

const getters = {
  tasks: (state) => {
    return state.tasks
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}