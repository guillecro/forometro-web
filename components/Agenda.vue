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
      <b-tabs v-model="selectedTab" type="is-boxed" size="is-large">
        <b-tab-item v-for="(day,i) in dayList" :key="`day${i}`" :value="day.date" >
          <template #header>
            {{day.label.toUpperCase()}}
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
          <div class="content" v-html="$md.render(evento.acerca)" />
        </div>
        <div class="media-left">
          <a v-for="participante in evento.participantes" :key="`evento-${evento.id}-participante-${participante.id}`" @click="openModalParticipante">
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
      console.log(new Date(date))
      return {
        date,
        label: format(new Date(`${date}T17:00:00.000Z`), "EEE, d 'de' LLLL", {locale: es}),
        agenda: groups[date]
      };
    });

    this.eventos = groupArrays
    this.selectedTab = groupArrays[0].date
    console.log(groupArrays)
    this.$store.commit('agenda/save', eventosList)
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
  width:40px;
  border-radius: 40px;
  border: 2px solid rgb(128, 128, 128);
}
</style>
