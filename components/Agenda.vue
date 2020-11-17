<template>
<div id="agenda">
<h1 class="title is-1 has-text-weight-bold my-6 has-text-primary has-text-centered">AGENDA</h1>
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
      <b-tabs v-model="selectedTab" type="is-boxed" size="is-large" position="is-centered">
        <b-tab-item v-for="(day,i) in dayList" :key="`day${i}`" :value="day.date" >
          <template #header>
            <span class="has-text-weight-medium has-text-primary">{{day.label.toUpperCase()}}</span>
          </template>
        </b-tab-item>
      </b-tabs>
      <div v-for="evento in eventosList" :key="`evento-${evento.id}`" class="media">
        <div class="media-left">
          <p class="is-size-4">
            {{ $theTime(evento.cuandoObject) }}
          </p>
        </div>
        <div class="media-content">
          <h5 class="title is-3 has-text-primary">
            {{ evento.titulo }}
          </h5>
          <div class="content" v-if="evento.acerca != null" v-html="$md.render(evento.acerca)" />
          <div v-if="evento.participantes.length > 0">

          <h1 class="title is-6 mb-2"><u>Participan:</u></h1>
          <p v-for="participante in evento.participantes" :key="`evento-${evento.id}-participante-${participante.id}-name`"><b>{{participante.nombre}}</b> <span v-if="participante.titulo">(<i>{{participante.titulo}}</i>)</span></p>
          </div>
        </div>
        <div class="media-left limit-width has-text-right" >
          <a v-for="participante in evento.participantes" :key="`evento-${evento.id}-participante-${participante.id}`" @click="openModalParticipante">
            <b-tooltip :label="`${participante.nombre}`">
              <img :src="$strapiAsset(participante.foto.url)" v-if="participante.foto" class="image participante-logo is-inline-block mx-2" loading="lazy" alt="">
              <img src="~/assets/generic-avatar.png" v-else class="image participante-logo is-inline-block mx-2" loading="lazy" alt="">
            </b-tooltip>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default {
  fetchOnServer: false,
  async fetch () {
    const eventos = await this.$strapi.$eventos.find({'_sort':'cuando:asc'})
    let eventosList = eventos.map((e) => {
      e.cuandoObject = new Date(e.cuando)
      return e
    })
    const groups = eventosList.reduce((groups, event) => {
      const date = event.cuando.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        //label: format(new Date(`${date}T17:00:00.000Z`), "EEE, d 'de' LLLL", {locale: es}),
        label: format(new Date(`${date}T17:00:00.000Z`), "EEEE, d/MM", {locale: es}),
        agenda: groups[date]
      };
    });

    this.eventos = groupArrays
    this.selectedTab = groupArrays[0].date
    this.$store.commit('calendar/save', eventosList)
  },
  data () {
    return {
      eventos: [],
      selectedTab: null
    }
  },
  methods: {
    openModalParticipante () {

    }
  },
  computed: {
    dayList: function(){
      if(this.eventos.length == 0) return []
      return this.eventos.map( g => { return {date: g.date, label: g.label} })
    },
    eventosList: function(){
      if(!this.selectedTab) return []
      if(this.eventos.length == 0) return []
      return this.eventos.find( e => {
        return e.date == this.selectedTab
      }).agenda
    }
  }
}
</script>

<style lang="scss" scoped>
.participante-logo{
  width:50px;
  border-radius: 40px;
  border: 1px solid rgb(128, 128, 128);
}
.limit-width{
  max-width: 200px;
}
.media{
  @media print,screen and (max-width:769px) {
    flex-direction: column;
    .limit-width{
      max-width: none;
      margin-top: 25px;
    }
  }
  flex-direction: row;
}
</style>
