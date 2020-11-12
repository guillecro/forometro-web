<template>
  <div v-if="$fetchState.pending">
    <h4 class="subtitle has-text-primary is-4 has-text-centered">
      <i class="fas fa-sync fa-spin" />&nbsp; Cargando agenda
    </h4>
  </div>
  <div v-else>
    <div v-if="$fetchState.error">
      <h4 class="subtitle has-text-primary is-4 has-text-centered">
        Ocurrió un error obtuviendo la agenda
      </h4>
    </div>
    <div v-else>
      <div v-for="evento in eventos" :key="`evento-${evento.id}`" class="media">
        <div class="media-left">
          <p class="is-size-4">
            {{ $theTime(evento.cuandoObject) }}
          </p>
        </div>
        <div class="media-content">
          <h5 class="title is-3 has-text-primary">
            {{ evento.nombre }}
          </h5>
          <div class="content">
            <p>{{ evento.acerca }}</p>
          </div>
        </div>
        <div class="media-left">
          <a @click="openModalParticipante" v-for="participante in evento.participantes" :key="`evento-${evento.id}-participante-${participante.id}`">
            <b-tooltip :label="`${participante.nombre} ${participante.apellido}`">
            <img :src="$strapiAsset(participante.foto.url)" class="image participante-logo is-inline-block mx-2" alt="">
            </b-tooltip>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetchOnServer: false,
  async fetch () {
    const eventos = await this.$strapi.$eventos.find()
    this.eventos = eventos.map((e) => {
      e.cuandoObject = new Date(e.cuando)
      return e
    })
  },
  data () {
    return {
      eventos: []
    }
  },
  methods: {
    openModalParticipante () {

    }
  }
}
</script>

<style lang="scss" scoped>
.participante-logo{
  width:40px;
  border-radius: 40px;
  border: 2px solid rgb(128, 128, 128);
}
</style>
