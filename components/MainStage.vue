<template>
  <div id="evento" class="hero is-primary is-bold my-5">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-3 has-text-weight-bold">
          El evento en VIVO
        </h1>
        <p class="is-inline is-600 is-size-5" v-if="debug" style="position: fixed; bottom: 0; left: 0;background-color: blue; color: white; padding: 5px 15px; z-index:1000">Hora: {{this.now}}</p>
        <div class="tile is-ancestor" v-show="true">
          <div class="tile is-parent">
            <div class="tile is-child">
              <div class="videoWrapper">
                <iframe
                  width="853"
                  height="480"
                  :src="`https://www.youtube.com/embed/${youtubeId}`"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
            </div>
            <div class="tile is-child is-4 slido-container">
              <iframe src="https://app.sli.do/event/cvhhfoqj" height="100%" width="100%" frameBorder="0" />
            </div>
          </div>
        </div>
        <coming-next :now="now" />
      </div>
    </div>
    <!-- https://github.com/creotip/vue-particles/issues/10 -->
    <no-ssr>
      <vue-particles color="FFFFFF" :hoverEffect="false" :clickEffect="false"></vue-particles>
    </no-ssr>
  </div>
</template>

<script>
import ComingNext from "./stage/ComingNext.vue";

export default {
  props: {
    youtubeId: {
      required: true,
      type: String
    }
  },
  data(){
    return {
      now: new Date(),
      // now: new Date(Date.UTC(2020,10,30,20,0,0)),
      starts: new Date(Date.UTC(2020, 11, 1, 13, 0, 0)),
      ends: new Date(Date.UTC(2020, 11, 5, 1, 0, 0)),
      intervalId: null,
      debug: false,
    }
  },
  components: {
    ComingNext,
  },
  mounted: function () {
    this.intervalId = setInterval(this.updateTime, 30000);
    //  this.intervalId = setInterval(this.updateTime, 300);
  },
  beforeDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
  methods: {
    updateTime: function () {
      this.now = new Date();
      // this.now = this.addMinutes(Math.floor(Math.random() * 10) + 5)
      // this.now = this.addSeconds(Math.floor(Math.random() * 30) + 10)
      // this.now = this.addSeconds(1800)
    },
    addMinutes(minutes) {
      return new Date(this.now.getTime() + minutes * 60000);
    },
    addSeconds(seconds) {
      return new Date(this.now.getTime() + seconds * 1000);
    },
  },
  computed: {
    showtime: function () {
      let desde = new Date(Date.UTC(2020, 11, 1, 3, 0, 0));
      let hasta = new Date(Date.UTC(2020, 11, 5, 1, 0, 0));
      if (desde <= this.now && this.now < hasta) return true;
      return false;
    },
    afterShowtime: function () {
      let desde = new Date(Date.UTC(2020, 11, 5, 1, 0, 0));
      if (desde <= this.now) return true;
      return false;
    },
  },
}
</script>

<style lang="scss" scoped>
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slido-container{
  height: 100%;
  @media print,screen and (max-width:769px) {
              height:500px;
  }
}
#particles-js {
  // background-size: cover;
  position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
}
.hero{
  position: relative;
  .hero-body{
    z-index: 10;
    background: linear-gradient(to bottom, #4a4a4b2f, #1d0f0b5d);
  }
}
</style>
