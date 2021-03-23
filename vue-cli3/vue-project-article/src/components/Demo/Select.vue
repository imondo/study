<template>
  <select v-model="value">
    <option :value="item.value" v-for="item, index in list" :key="index">{{
      item.label
    }}</option>
  </select>
</template>

<script>
export default {
  props: {
    item: {
      type: [String, Number],
      default: undefined,
    },
    option: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: this.option
    }
  },
};
</script>
