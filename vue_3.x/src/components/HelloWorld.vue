<template>
  <div>
    <div>
      <h1>{{ privateMsg }}</h1>
      <h1>computed：{{ sum }}</h1>
      <button @click="count++">count is: {{ count }}</button>
    </div>
    <div>
      <h1>
        inject color:
        <span :style="{color: theme}">{{ name.forwards }}</span>
      </h1>
    </div>
    <div>
      <h1 ref="color">refs color: {{ obj }}</h1>
      <h1>customRef: {{ cusThemes }}</h1>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  watchEffect,
  watch,
  onMounted,
  onUpdated,
  onUnmounted,
  inject,
  toRef,
  toRefs,
  unref
} from "vue";

import { cusTheme } from "../injects/theme.js"

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props, { attrs }) {
    const count = ref(1);
    console.log(attrs.test); // 测试

    console.log(count.value);
    const name = reactive({
      forwards: `Mondo`
    });

    const state = reactive({
      count,
      name: 'Mondo',
      obj: {
        a: 1
      }
    });

    // const stateRef = toRef(state)

    // console.log(stateRef, 'toRef');

    const otherCount = ref(10);
    state.count = otherCount;
    console.log(state.count);
    console.log(count.value);

    const sum = computed({
      get: () => count.value + 1,
      set: value => {
        count.vlaue = value - 1;
      }
    });

    sum.value = 55;

    console.log(sum.value, count.vlaue); // 2, 54

    watchEffect(
      () => {
        console.log(name.forwards, 55);
      },
      {
        flush: "pre"
      }
    );

    setTimeout(() => {
      name.forwards = `imondo.cn`;
    }, 1500);

    watch(count, (prevFoo, prevBar) => {
      console.log(prevFoo, prevBar);
    });

    onMounted(() => {
      console.log("mounted!");
    });
    onUpdated(() => {
      console.log("updated!");
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });

    const theme = inject("textColor");

    setTimeout(() => {
      theme.value = "blue";
    }, 1500);

    watchEffect(() => {
      console.log(theme.value, "inject");
    });

    const color = ref(null);

    onMounted(() => {
      color.value.style.color = "red";

    });

    const a = 1;

    console.log(unref(a), 'unref')

    const cusThemes = cusTheme(1)


    return { count, privateMsg: props.msg, name, sum, theme, color, ...toRefs(state), cusThemes };
  }
};
</script>
