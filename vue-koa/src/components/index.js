import DemoComps from './demo-comps/index.vue'

const components = [
  DemoComps
];

const install = (Vue) => {
  components.map(component => { Vue.component(component.name, component)});
}
export default {
  install
}