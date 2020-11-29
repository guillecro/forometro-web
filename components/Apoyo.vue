<template>
  <section id="apoyos">
    <div class="separator title is-4 has-text-weight-bold">Apoyan el XVII Foro Metropolitano</div>
    <div class="columns is-centered is-vcentered is-multiline is-mobile">
      <div class="column is-6-mobile is-6-tablet is-6-desktop" v-for="company in companiesUpper" :key="company.id">
        <div class="image-container-upper">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" :alt="company.nombre" loading="lazy">
          </a>
        </div>
      </div>
    </div>
    <br>
    <div class="columns is-centered is-vcentered is-multiline is-mobile">
      <div class="column is-5-mobile is-3-tablet is-4-desktop" v-for="company in companiesMid" :key="company.id">
        <div class="image-container-mid">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" :alt="company.nombre" loading="lazy">
          </a>
        </div>
      </div>
    </div>
    <br>
    <div class="columns is-centered is-vcentered is-multiline is-mobile">
      <div class="column is-4-mobile is-3-tablet is-3-desktop" v-for="company in companiesLower" :key="company.id">
        <div class="image-container-lower">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" :alt="company.nombre" loading="lazy">
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="line-separator"></div> -->
  </section>
</template>

<script>
export default {
  async fetch () {
    const companies = await this.$strapi.$acompanamientos.find()
    this.companies = companies
  },
  fetchOnServer: false,
  data () {
    return {
      companies: [],
    }
  },
  computed: {
    companiesUpper: function(){
      if(this.companies.length == 0) return []
      return this.companies.filter( x => x.nivel == 'encima').sort( (a,b) => a.orden - b.orden)
    },
    companiesMid: function(){
      if(this.companies.length == 0) return []
      return this.companies.filter( x => x.nivel == 'medio').sort( (a,b) => a.orden - b.orden)
    },
    companiesLower: function(){
      if(this.companies.length == 0) return []
      return this.companies.filter( x => x.nivel == 'debajo').sort( (a,b) => a.orden - b.orden)
    },
  },
}
</script>

<style lang="scss" scoped>
.image-container-upper {
  height: 220px;
  //margin: 10px;
  position: relative;
  img{
    max-height: 98%;
    max-width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
}
.image-container-mid {
  height: 150px;
  //margin: 10px;
  position: relative;
  img{
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
}
.image-container-lower {
  height: 100px;
  //margin: 10px;
  position: relative;
  img{
    max-height: 80%;
    max-width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
}
.separator {
  margin: 20px 0;
    display: flex;
    align-items: center;
    text-align: center;
}
.separator::before, .separator::after {
  content: '';
    flex: 1;
    border-bottom: 4px solid #c42330;
}
.separator::before {
  margin-right: .25em;
}
.separator::after {
  margin-left: .25em;
}
</style>
