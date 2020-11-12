<template>
  <div class="task-list">
    <ul v-if="tasks.length">
      <li v-for="(item, index) in tasks" :key="index" class="task-list-item">
        <p class="task-text" :class="{completed: item.completed}">{{ item.content }}</p>
      </li>
    </ul>
    <p v-else>
      暂无已完成任务
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useTaskList } from '../use-hook';

export default defineComponent({
  name: 'Completed',
  setup() {
    const { list } = useTaskList()
    const tasks = list.value.filter(v => v.completed);
    return {
      tasks
    }
  }
})
</script>