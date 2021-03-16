import { createApp } from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import LoginModal from "./LoginModal/index.js";
import './index.css'

createApp(Login).use(LoginModal).mount('#app')
