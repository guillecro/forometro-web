<template>
  <section>
    <div class="separator title is-4 has-text-weight-bold">Apoyan el XVII Foro Metropolitano</div>
    <div class="columns is-centered is-vcentered">
      <div class="column is-2" v-for="company in companies" :key="company.id">
        <div class="slide-image-normalize">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" alt="">
          </a>
        </div>

      </div>
    </div>
  
    <div class="line-separator"></div>
  </section>
</template>

<script>
export default {
  async fetch () {
    const companies = await this.$strapi.$acompanamientos.find()
    this.companies = companies
  },
  data () {
    return {
      companies: [],
    }
  },
  fetchOnServer: false
}
</script>

<style lang="scss" scoped>
.slide-image-normalize {
  height: 130px;
  //margin: 10px;
  position: relative;
  img{
    max-height: 50%;
    max-width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
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
.line-separator{
  margin: 20px 0;
      border-bottom: 4px solid #c42330;

}
</style>
