<template>
<section id="stands">
    <h1 class="title is-1 has-text-primary has-text-centered has-text-weight-bold">STANDS</h1>
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
                                    <div class="some-stand columns is-vcentered" v-if="!stand.imagenFull">
                                        <div class="column">
                                            <div class="image-container box">
                                                <img :src="$strapiAsset(stand.logo.url)" loading="lazy" class="image logo-stand is-centered" :alt="stand.nombre">
                                            </div>
                                        </div>
                                        <div class="column">
                                                <h5 class="title is-2 has-text-white has-text-weight-bold ">{{stand.nombre}}</h5>
                                            <div class="content force-text mb-0" v-if="stand.acerca">
                                                <div v-html="$md.render(stand.acerca)" />
                                            </div>
                                                <p>
                                                    <a v-if="stand.web" :href="stand.web" target="_blank" class="has-text-white"><i class="fas fa-globe fa-lg is-inline-block mr-4 mt-4"></i></a>
                                                    <a v-if="stand.facebook" :href="stand.facebook" target="_blank" class="has-text-white"><i class="fab fa-facebook-f fa-lg is-inline-block mr-4 mt-4"></i></a>
                                                    <a v-if="stand.twitter" :href="stand.twitter" target="_blank" class="has-text-white"><i class="fab fa-twitter fa-lg is-inline-block mr-4 mt-4"></i></a>
                                                    <a v-if="stand.linkedIn" :href="stand.linkedIn" target="_blank" class="has-text-white"><i class="fab fa-linkedin fa-lg is-inline-block mr-4 mt-4"></i></a>
                                                    <a v-if="stand.youtube" :href="stand.youtube" target="_blank" class="has-text-white"><i class="fab fa-youtube fa-lg is-inline-block mr-4 mt-4"></i></a>
                                                    <span v-if="stand.whatsapp" class="is-inline-block mr-4 mt-4"><i class="fab fa-whatsapp fa-lg"></i> <b>{{stand.whatsapp}}</b></span>
                                                </p>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="columns is-centered">
                                            <div class="column is-8">
                                        <a :href="stand.imagenFull.url" target="_blank">
                                        <img :src="$strapiAsset(stand.imagenFull.url)" class="image is-centered" alt="">
                                        </a>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                                <h5 class="title is-4 has-text-white has-text-centered has-text-weight-bold " v-if="stand.videos.length">VIDEOS</h5>
                                    <div class="columns is-centered is-multiline is-mobile" v-if="stand.videos.length">
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