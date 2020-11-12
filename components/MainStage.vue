<template>
  <div class="columns is-centered">
    <div class="column is-9">
      <div class="videoWrapper">
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${youtubeId}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
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
</style>
