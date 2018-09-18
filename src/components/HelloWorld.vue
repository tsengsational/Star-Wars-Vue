<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Display characters names and url -->
    <article v-for="(c, idx) in characters" :key="idx">
      <h1>{{ c.name }}</h1>
      <h3>{{ c.url }}</h3>
    </article>
    <!-- User chooses which character -->
    <form @submit="chooseChar(name, url)">
      <input v-model="name" placeholder="Character Name">
      <input v-model="url" placeholder="URL">
      <button type="submit">Show information</button>
    </form>

    <!-- Trying to pass data to component -->
    <film info='filmInfo'></film>
    <!-- Testing to see if axios or vue-resource is fetching api -->
    <!-- {{}} -->
    <h1>{{results.name}}</h1>
    {{results.name}}
    <!-- Loop through arrays to display all movies and their date -->
    <article v-for="(t, idx) in title" :key="idx">
      <h5>{{ title[idx] }}</h5>
      <h5>{{ date[idx] }}</h5>
    </article>

  </div>

</template>

<script>
import { db } from '../main'
import Film from './Film'
// import axios from 'axios'

export default {
  name: 'HelloWorld',
  components: {
    Film
  },
  data () {
    return {
      msg: 'Please choose one of the characters:',
      characters: [],
      name: '',
      url: '',
      results: {},
      title: [],
      date: [],
      filmInfo: [], // For Film component
      resP: {},
      resF: {}
    }
  },
  firestore () {
    return {
      characters: db.collection('characters').orderBy('name')
    }
  },
  methods: {
    chooseChar (name, urls) {
      // Get individual person
      fetch(urls).then((response) => {
        return response
      // axios({ method: 'GET', 'url': urls }).then((response) => {
      //   return response.json()
      // this.$http.get(urls).then((response) => {
      //   this.resP = response
      }).then((p) => {
        this.results = p
        // Get films
        this.results.films.forEach((filmUrl) => {
          fetch(filmUrl).then((response) => {
            return response
          // axios({ method: 'GET', 'url': filmUrl }).then((response) => {
          //   return response.json()
          // this.$http.get(filmUrl).then((response2) => {
          //   this.resF = response2
          }).then((info) => {
            this.filmInfo.push(info)
            this.title.push(info.title)
            this.date.push(info.release_date)
          })
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
