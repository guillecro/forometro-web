<template>
  <div class="hero is-primary is-bold my-5">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-3 has-text-weight-bold">
          El evento en VIVO
        </h1>
        <div class="tile is-ancestor" v-show="false">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    youtubeId: {
      required: true,
      type: String
    }
  }
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
</style>
