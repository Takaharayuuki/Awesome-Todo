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

}

const actions = {

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