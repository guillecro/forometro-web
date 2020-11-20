
<template>
  <section>
    <HeaderHome />
    <MainStage v-if="homepage.youtubeId" :youtube-id="homepage.youtubeId" />
    <div class="container">
      <!-- <img :src="$strapiAsset(homepage.coverPrincipal.url)" class="image is-fullwidth" alt=""> -->
      <!-- <br> -->
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeO-qbrV-mi1QHlY788LqlfLtOZwa1SdzdzwXRO02B5H6aTXw/viewform" target="_blank"><img src="~/assets/register.svg" class="image is-fullwidth" alt=""></a>
      <br>
      <div class="who-container is-clearfix">
        <img src="~/assets/who-right.svg" class="image who-right is-pulled-right" alt="">
        <div class="who-left" />
      </div>
    </div>
    <div class="section">
      <div class="container">
          <h1 class="title is-1 has-text-primary has-text-weight-bold has-text-centered my-6">
          ACERCA DEL FORO
        </h1>
        <div class="columns is-centered has-text-centered">
          <div class="column is-9">
            <div class="content is-medium">
              <div v-html="$md.render(homepage.introduccion)" />
              <br>
              <div v-html="$md.render(homepage.acercaDe)" />
            </div>
          </div>
        </div>
      <!--<Acompanamiento />-->
      <Agenda />
      </div>
    </div>
    <!-- <div class="line-separator mt-6"></div> -->
    <!-- <div class="mb-6"> -->
    <!-- </div> -->
    <Stands />
    <Galeria />
    <div class="section">

    <div class="container">
      <Apoyo />
      <Socios />
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
