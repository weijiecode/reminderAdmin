<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
  <button @click="btn">test</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  setup(){
    const btn = ()=> {
      console.log('123')
       document.documentElement.style.setProperty("--theme_bg_color", '#1E90FF');
      document.documentElement.style.setProperty("--theme_font_color", '#aaa');
    }
    return {
      btn
    }
  }
});
</script>
<style scoped>
.home {
  background-color: var(--theme_bg_color);
}
</style>
