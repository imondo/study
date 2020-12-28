<template>
  <div class="home">
    <h3>父子组件</h3>
    <Parent />

    <h3>祖孙组件</h3>
    <Grand />

    <h3>兄弟组件</h3>
    <Child />
    <ChildOne />

    <h3>v-model和sync</h3>
    <ModelSync v-model="msg" :value.sync="syncMsg" />
    <p>ModelSync中val: {{ msg }}</p>
    <p>ModelSync中syncMsg: {{ syncMsg }}</p>

    <h3>$children和$parent</h3>
    <input v-model="value" />
    <button @click="handleClick">点我</button>
    <p>Child中的value:{{ childMsg }}</p>
    <ChildParent />

    <h3>$attrs和$listeners</h3>
    <AttrListen
      placeholder="这是个attr"
      :test="value"
      v-bind="$attrs"
      v-on="$listeners"
      @click="handleListen"
    />
  </div>
</template>

<script>
import Parent from "@/components/Parent/Parent";
import Grand from "@/components/Grand/Grand";
import Child from "@/components/Bus/Child";
import ChildOne from "@/components/Bus/ChildOne";
import ModelSync from "@/components/ModelSync/ModelCom";
import ChildParent from "@/components/ChildParent";
import AttrListen from "@/components/AttrListen/Attr";
export default {
  name: "home",
  components: {
    Parent,
    Grand,
    Child,
    ChildOne,
    ModelSync,
    ChildParent,
    AttrListen
  },
  data() {
    return {
      msg: "",
      syncMsg: "",
      value: "",
      childMsg: ""
    };
  },
  methods: {
    handleClick() {
      this.$nextTick(() => {
        this.childMsg = this.$children[5].value;
      });
    },
    handleListen() {
      this.value = "监听了$listeners";
    }
  }
};
</script>
