<template>
<section id="stands">
            <section :class="`hero is-primary is-bold`">
                <div class="hero-body">
                    <div class="container">
    <div v-if="$fetchState.pending">
        <h4 class="subtitle has-text-white is-4 has-text-centered">
        <i class="fas fa-sync fa-spin" />&nbsp; Cargando stands
        </h4>
    </div>
    <div v-else>
         <div v-if="$fetchState.error">
            <h4 class="subtitle has-text-white is-4 has-text-centered">
                Ocurrió un error obtuviendo los stands
            </h4>
        </div>
        <div v-else>
                        <b-carousel v-if="stands.length" indicator-style="is-lines" icon-pack="fas" icon-size="is-medium" :interval="8000">
                            <b-carousel-item v-for="(stand, i) in stands" :key="`stand-${i}`">
                                <div class="image-container box">
                                    <img :src="$strapiAsset(stand.logo.url)" loading="lazy" class="image logo-stand is-centered" :alt="stand.nombre">
                                </div>
                                <h5 class="title is-2 has-text-centered has-text-white has-text-weight-bold mt-5">{{stand.nombre}}</h5>
                                <br>
                                <div class="columns is-centered is-multiline is-mobile">
                                    <div class="column is-4-mobile is-3-tablet is-2-desktop" v-for="video in stand.videos" :key="`stand-${stand.id}-video-${video.id}`">
                                        <a :href="video.url" target="_click">
                                            <img :src="`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`" class="image is-fullwidth video-thumbnail" alt="">
                                            <h6 class="title is-6 has-text-weight-bold has-text-white has-text-left my-5"><i class="fab fa-youtube has-text-white"></i>&nbsp;&nbsp;{{video.titulo}}</h6>
                                        </a>
                                    </div>
                                </div>
                            </b-carousel-item>
                        </b-carousel>
        </div>
    </div>
                    </div>
                </div>
            </section>
</section>
</template>

<script>
export default {
    fetchOnServer: false,
    async fetch () {
        const stands = await this.$strapi.$stands.find()
        this.stands = stands;
    },
    data(){
        return {
            stands: []
        }
    }
}
</script>

<style lang="scss" scoped>
.image-container {
  height: 200px;
  max-width: 500px;
  margin: 0 auto;
  //margin: 10px;
  position: relative;
  img{
    max-height: 75%;
    max-width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
}
.video-thumbnail{
    border-radius: 5px;
}
</style>