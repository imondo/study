<template>
  <div>
    <Select v-model="value" :option="option"></Select>
    <button @click="onClick">点击</button>
  </div>
</template>

<script>
import Select from "../components/Demo/Select.vue";
export default {
  components: {
    Select,
  },
  data() {
    return {
      value: "",
      option: [
        {
          label: "测试",
          value: 1,
        },
        {
          label: "测试1",
          value: 2,
        },
        {
          label: "测试2",
          value: 3,
        },
      ],
    };
  },
  methods: {
    onClick() {
      this.option = []
    }
  },
};
</script>
