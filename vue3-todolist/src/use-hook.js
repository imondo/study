import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export function useTaskList() {

  const store = useStore()

  const state = reactive({
    list: store.state.list,
    task: ''
  })

  const addTask = () => {
    if (!state.task) {
      alert('任务必填')
      return
    }
    state.list.push({
      content: state.task,
      completed: false,
      id: new Date().getTime()
    })

    store.dispatch('GetList', state.list)

    state.task = ''
  }

  const clearTask = () => {
    state.list = [];
  }

  const delTask = id => {
    const index = state.list.findIndex(v => v.id === id)
    state.list.splice(index, 1);
  }

  return {
    ...toRefs(state),
    addTask,
    clearTask,
    delTask
  }
}