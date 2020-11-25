<template>

<section id="galerias">
              <div class="hero is-light is-bold">
                <div class="hero-body">
                  <div class="section">
                    <div class="container">
                      <h1 class="title is-1 has-text-weight-bold has-text-primary has-text-centered">GALERIA DE EXPERIENCIAS</h1>
                      <br>
    <div v-if="$fetchState.pending">
        <h4 class="subtitle has-text-primary is-4 has-text-centered">
        <i class="fas fa-sync fa-spin" />&nbsp; Cargando galeria
        </h4>
    </div>
    <div v-else>
         <div v-if="$fetchState.error">
            <h4 class="subtitle has-text-primary is-4 has-text-centered">
                Ocurrió un error obtuviendo la galeria
            </h4>
        </div>
        <div v-else>
          <VueSlickCarousel v-bind="settings">
              <div class="carousel-container" v-for="(video, i) in galeria" :key="`video-galeria-${i}`">
                <a :href="video.url" target="_click">
                <div class="overlay-image">
                   <p class="title is-5 px-5 py-5 has-text-white"><i class="fab fa-youtube has-text-white"></i>&nbsp;&nbsp;{{ video.titulo }}</p>
                </div>
                            <figure class="image is-16by9">
                                <img :src="`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`">
                            </figure>
                </a>

              </div>
            <!-- <div class="box" v-for="(video, i) in galeria" :key="`video-galeria-${i}`">
                        <div class="card-image">
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <a :href="video.url" target="_click"><p class="title is-5 has-text-primary"><i class="fab fa-youtube has-text-danger"></i>&nbsp;&nbsp;{{ video.titulo }}</p></a>
                            </div>
                        </div>
                    </div> -->
                <!-- <template #prevArrow>
                  <i class="fas fa-chevron-left fa-3x has-text-primary"></i>
                </template>
                <template #nextArrow>
                  <i class="fas fa-chevron-left fa-3x has-text-primary"></i>
                </template> -->
          </VueSlickCarousel>
            <!-- <b-carousel-list v-model="test" :data="galeria" :items-to-show="5" icon-pack="fas" icon-size="icon-medium">
                <template slot="item" slot-scope="video">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-16by9">
                                <a :href="video.url" target="_click"><img :src="`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`"></a>
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <a :href="video.url" target="_click"><p class="title is-5 has-text-primary"><i class="fab fa-youtube has-text-danger"></i>&nbsp;&nbsp;{{ video.titulo }}</p></a>
                            </div>
                        </div>
                    </div>
                </template>
            </b-carousel-list> -->
        </div>
    </div>
                    </div>
                  </div>  
                </div>
              </div>
</section>  
</template>

<script>
export default {
    fetchOnServer: false,
    async fetch () {
        const galeria = await this.$strapi.$galeria.find();
        this.galeria = galeria.videos;
    },
    data(){
        return {
          test: 0,
          galeria: [],
          settings: {
            dots: true,
            focusOnSelect: true,
            autoplay: true,
            autoplaySpeed: 7000,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            touchThreshold: 5,
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  adaptiveHeight: true,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  adaptiveHeight: true,
                }
              }, 
            ],
          }
        }
    }
}
</script>


<style lang="scss" scoped>
// .carousel-list.has-shadow{
//   box-shadow: none;
// }
.carousel-container{
  position: relative;
  .overlay-image{
    position:absolute;
    z-index: 20;
    height: 100%;
    width: 100%;
    background: rgb(128,23,23);
    background: -moz-linear-gradient(3deg, rgba(128,23,23,0.8729692560617998) 16%, rgba(55,23,23,0) 67%);
    background: -webkit-linear-gradient(3deg, rgba(128,23,23,0.8729692560617998) 16%, rgba(55,23,23,0) 67%);
    background: linear-gradient(3deg, rgba(128,23,23,0.8729692560617998) 16%, rgba(55,23,23,0) 67%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#801717",endColorstr="#371717",GradientType=1);
    display: flex;
    align-items: flex-end;
    p {
      text-shadow: 1px 1px 1px #000;
    }
  }
}
</style>