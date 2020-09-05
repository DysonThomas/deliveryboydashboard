<template>
  <div class="home">
    <navbar/>
   <homepage/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import homepage from '@/components/homepage.vue'
import navbar from '@/components/navbar.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    homepage,
    navbar
  }
}
</script>
