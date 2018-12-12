<template>
  <div class="table">
    <el-table row-key="date" ref="table" v-bind="headerConfig" style="width: 100%">
      <template v-for="(item) in colModel">
        <slot v-if="item.solt" :name="item.solt" v-bind="item"></slot>
        <component v-else-if="item.isEadit" :is="CusInput" :cell="item"></component>
        <el-table-column v-else v-bind="item"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import CusInput from "./input.vue";

export default {
  /* eslint-disable */
  props: {
    headerConfig: {
      type: Object,
      default: () => {
        return { data: [] };
      }
    },
    colModel: {
      require: true,
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      CusInput
    };
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style scoped>
</style>