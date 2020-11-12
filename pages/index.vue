
<template>
  <section class="section">
    <div class="container">
      <Navbar/>
      <br>
      <img :src="$strapiAsset(homepage.coverPrincipal.url)" class="image is-fullwidth" alt="">
      <br>
      <a href="#"><img src="~/assets/register.svg" class="image is-fullwidth" alt=""></a>
      <br>
      <div class="who-container is-clearfix">
        <img src="~/assets/who-right.svg" class="image who-right is-pulled-right" alt="">
        <div class="who-left" />
      </div>
      <div class="content">
        <h1 class="title is-2">
          Bienvenida
        </h1>
        <div v-html="$md.render(homepage.introduccion)" />
        <br>
        <div v-html="$md.render(homepage.acercaDe)" />
      </div>

      <h1 class="title is-2">
        Acompañan
      </h1>
      <Acompanamiento />
      <MainStage :youtube-id="homepage.youtubeId" v-if="homepage.youtubeId" />
      <Agenda />
    </div>
  </section>
</template>

<script>

export default {
  name: 'HomePage',
  async asyncData ({ params, $strapi }) {
    const homepage = await $strapi.$homepage.find()
    return { homepage }
  },
  data () {
    return {
      homepage: null
    }
  }
}
</script>

<style lang="scss" scoped>

.who-container{
    width: 100%;
    display: block;
    background: url('~assets/who-left.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin:5px 0 10px;
  .who-right{
    height: 60px;
  }
}
</style>
