
<template>
  <section>
    <HeaderHome />
    <MainStage v-if="homepage.youtubeId" :youtube-id="homepage.youtubeId" />
    <div class="container">
      <!-- <img :src="$strapiAsset(homepage.coverPrincipal.url)" class="image is-fullwidth" alt=""> -->
      <!-- <br> -->
      <a href="#"><img src="~/assets/register.svg" class="image is-fullwidth" alt=""></a>
      <br>
      <div class="who-container is-clearfix">
        <img src="~/assets/who-right.svg" class="image who-right is-pulled-right" alt="">
        <div class="who-left" />
      </div>
    </div>
    <div class="section">
      <div class="container">
          <h1 class="title is-2 has-text-primary has-text-weight-bold has-text-centered my-6">
          ACERCA DEL FORO
        </h1>
      <div class="content">
        <div v-html="$md.render(homepage.introduccion)" />
        <br>
        <div v-html="$md.render(homepage.acercaDe)" />
      </div>
      <!--<Acompanamiento />-->
      <Agenda />
      </div>
    </div>
    <div class="container">
    <div class="line-separator mt-6"></div>
    <div class="mb-6">
    <Stands />
      <Apoyo />
    </div>
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
    height: 65px;
    margin-right: -2px;
  }
}
</style>
