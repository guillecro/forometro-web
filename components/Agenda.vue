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
      <b-tabs v-model="selectedTab" type="is-boxed" size="is-large" position="is-centered"  :multiline="true">
        <template v-for="(day,i) in daysList">
          <b-tab-item
              :key="`dat${i}`"
              :value="day.date"
              :label="day.label.toUpperCase()">
          </b-tab-item>
        </template>
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
          <!-- <p v-for="participante in evento.participantes" :key="`evento-${evento.id}-participante-${participante.id}-name`"><b>{{participante.nombre}}</b> <span v-if="participante.titulo">(<i>{{participante.titulo}}</i>)</span></p> -->
          <p v-for="orador in evento.oradores" :key="`evento-${evento.id}-orador-${orador.participante.id}-name`"><b>{{orador.participante.nombre}}</b> <span v-if="orador.participante.titulo">(<i>{{orador.participante.titulo}}</i>)</span></p>
          <h1 v-if="evento.moderador" class="title is-6 mb-2 mt-4"><u>Modera:</u></h1>
          <p v-if="evento.moderador"><b>{{evento.moderador.nombre}}</b> <span v-if="evento.moderador.titulo">(<i>{{evento.moderador.titulo}}</i>)</span></p>
          </div>
        </div>
        <div class="media-left limit-width has-text-right-tablet has-text-left-mobile" >
          <a v-for="orador in evento.oradores" :key="`evento-${evento.id}-orador-${orador.participante.id}`" @click="openModalParticipante(orador.participante)">
            <b-tooltip :label="`${orador.participante.nombre}`">
              <div class="participante-logo-two with-avatar mx-2 mb-2 is-inline-block" v-if="orador.participante.foto" :style="`background-image: url(${$strapiAsset(orador.participante.foto.url)})`"></div>
              <div class="participante-logo-two no-avatar mx-2 mb-2 is-inline-block" v-else></div>
            </b-tooltip>
          </a>
          <a v-if="evento.moderador" @click="openModalParticipante(evento.moderador)">
            <b-tooltip multilined>
              <template v-slot:content>
                <u><b>Modera</b></u><br>{{evento.moderador.nombre}}
            </template>
              <div class="participante-logo-two with-avatar is-moderator mx-2 mb-2 is-inline-block" v-if="evento.moderador.foto" :style="`background-image: url(${$strapiAsset(evento.moderador.foto.url)})`"></div>
              <div class="participante-logo-two no-avatar mx-2 mb-2 is-inline-block" v-else></div>
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
import PersonModal from './PersonModal'
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
    this.daysList = groupArrays.map( g => { return {date: g.date, label: g.label} })
    this.selectedTab = groupArrays[1].date
    this.$store.commit('calendar/save', eventosList)
  },
  data () {
    return {
      eventos: [],
      daysList: [],
      selectedTab: null
    }
  },
  methods: {
    openModalParticipante (person) {
      this.$buefy.modal.open({
        parent: this,
        component: PersonModal,
        hasModalCard: true,
        props: {
          person: person
        },
      })
    }
  },
  computed: {
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
.participante-logo-two{
  width:64px;
  height:64px;
  border-radius:50%;
  // border: 1px solid #;
  box-shadow: 1px 1px 4px 0px rgba(0,0,0,.2);
     /* fill the container, preserving aspect ratio, and cropping to fit */
  background-size: cover;
    /* center the image vertically and horizontally */
  background-position: top center;
  // &.with-avatar{
  // }
  &.is-moderator{
    border: 3px solid #c42330;
  }
  &.no-avatar{
    background-image: url('~assets/generic-avatar.png')
  }
}
.limit-width{
  width: 40%;
  min-width: 200px;
  max-width: 300px;
}
.media{
  @media print,screen and (max-width:769px) {
    flex-direction: column;
    .limit-width{
      max-width: none;
      min-width: none;
      width: 100%;
      margin-top: 25px;
    }
  }
  flex-direction: row;
}
</style>
