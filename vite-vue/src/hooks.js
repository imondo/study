import { ref } from 'vue'

export const useLogin = () => {
  const visible = ref(false);
  const onLogin = (type) => {
    console.log(type);
    visible.value = true;
    console.log(visible);
  }
  const onClose = () => {
    visible.value = false;
  }
  return {
    visible,
    onLogin,
    onClose
  }
}