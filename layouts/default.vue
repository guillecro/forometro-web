<template>
  <section>
    <Navbar />
    <Nuxt />
    <TheFooter />
  </section>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue'
export default {
  components: {
    TheFooter
  },
  data () {
    return {
      items: [
        // {
        //   title: 'Home',
        //   icon: 'home',
        //   to: { name: 'index' }
        // },
        // {
        //   title: 'Inspire',
        //   icon: 'lightbulb',
        //   to: { name: 'inspire' }
        // }
      ]
    }
  }
}
</script>
