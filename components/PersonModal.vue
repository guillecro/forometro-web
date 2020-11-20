<template>
    <div class="modal-card" style="width: auto">
       
        <section class="modal-card-body">
            <div class="participante-logo-modal with-avatar is-moderator" v-if="person.foto" :style="`background-image: url(${$strapiAsset(person.foto.url)})`"></div>
            <div class="participante-logo-modal no-avatar" v-else></div>
            <h1 class="title is-2 has-text-centered has-text-primary has-text-weight-bold">
                {{person.nombre}}
            </h1>
            <h1 class="subtitle is-4 has-text-centered">
                <i>{{person.titulo}}</i>
            </h1>
        </section>
        
    </div>
</template>

<script>
export default {
    props: ['person']
}
</script>

<style lang="scss" scoped>
.modal-card{
    border-radius: 10px;
}
.modal-card-body{
    padding: 20px 40px;
}
.participante-logo-modal{
  width:250px;
  height:250px;
  border-radius:50%;
  margin: 0 auto 30px;
  z-index: 100;
  position: relative;
  // border: 1px solid #;
  box-shadow: 1px 1px 4px 0px rgba(0,0,0,.2);
     /* fill the container, preserving aspect ratio, and cropping to fit */
  background-size: cover;
    /* center the image vertically and horizontally */
  background-position: top center;
  &.with-avatar{
  }
  &.is-moderator{
    // border: 3px solid #c42330;
  }
  &.no-avatar{
    background-image: url('~assets/generic-avatar.png')
  }
}
</style>