<template>
  <div class="task-add">
    <input v-model="task" class="el-input el-input__inner" type="text" placeholder="请输入任务" @keyup.enter="addTask">
    <div class="el-button-group">
      <button class="el-button el-button--primary" @click="addTask">添加任务</button>
      <button class="el-button el-button--danger" @click="clearTask">清空任务</button>
    </div>
  </div>
  <div class="task-list">
    <ul v-if="list.length">
      <li v-for="(item, index) in list" :key="index" class="task-list-item">
        <input type="checkbox" class="checkbox" v-model="item.completed">
        <p class="task-text" :class="{completed: item.completed}">{{ item.content }}</p>
        <i class="task-del el-icon-delete" @click="delTask(item.id)"></i>
      </li>
    </ul>
    <p v-else>
      暂无任务
    </p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useTaskList } from '../use-hook';

export default {
  name: 'Home',
  setup() {
    const { list, task, addTask, clearTask, delTask } = useTaskList()

    return {
      task,
      list,
      addTask,
      clearTask,
      delTask
    }
  }
}

// function useTaskList() {
//   const state = reactive({
//     list: [],
//     task: ''
//   })

//   const addTask = () => {
//     if (!state.task) {
//       alert('任务必填')
//       return
//     }
//     state.list.push({
//       content: state.task,
//       completed: false,
//       id: new Date().getTime()
//     })

//     state.task = ''
//   }

//   const clearTask = () => {
//     state.list = [];
//   }

//   const delTask = id => {
//     const index = state.list.findIndex(v => v.id === id)
//     state.list.splice(index, 1);
//   }

//   return {
//     ...toRefs(state),
//     addTask,
//     clearTask,
//     delTask
//   }
// }

</script>