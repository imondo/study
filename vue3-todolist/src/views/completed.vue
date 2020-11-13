<template>
  <div class="task-list">
    <ul v-if="tasks.length">
      <li v-for="(item, index) in tasks" :key="index" class="task-list-item">
        <p class="task-text" :class="{completed: item.completed}">{{ item.content }}</p>
        <i class="task-del el-icon-delete" @click="delTask(item.id)"></i>
      </li>
    </ul>
    <p v-else>
      暂无已完成任务
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useTaskList } from '../use-hook';

export default defineComponent({
  name: 'Completed',
  setup() {
    const { state: { list } } = useStore()
    const tasks = computed(() => list.filter(v => v.completed))
    const { delTask } = useTaskList()
    return {
      tasks,
      delTask
    }
  }
})
</script>