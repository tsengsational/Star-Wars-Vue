<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Display characters names and url -->
    <!-- FEEDBACK: use more readiable variables. why choose "c" over "character"? -->
    <article v-for="(c, idx) in characters" :key="idx">
      <h1>{{ c.name }}</h1>
      <h3>{{ c.url }}</h3>
    </article>
    <!-- User chooses which character -->
    <!-- FEEDBACK: why make someone input a url that you already have? Wouldn't it be easier to use a radio input or drop down and grab the url from the data object based off the -->
    <form @submit="chooseChar(name, url)">
      <input v-model="name" placeholder="Character Name">
      <input v-model="url" placeholder="URL">
      <button type="submit">Show information</button>
    </form>

    <!-- Trying to pass data to component -->
    <!-- FEEDBACK: To pass prop to component you have to include a `:` ahead of the prop name. i.e. `<film :info="filmInfo">` -->
    <film info='filmInfo'></film>
    <!-- Testing to see if axios or vue-resource is fetching api -->
    <!-- {{}} -->
    <h1>{{results.name}}</h1>
    {{results.name}}
    <!-- Loop through arrays to display all movies and their date -->
    <!-- FEEDBACK: Might be a good idea to use a v-if directive to conditionally render this only when the title is present in the data object -->
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
    // FEEDBACK: Why have three seperate arrays for title, date, etc.? Why not just have an array with object as elements. This is very vulnerable to getting one array out of sync with the others. Better to bind all the information for each film to one object, rather than trying to maintain three sources of truth.
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
// FEEDBACK: great use of scoped!
// FEEDBACK: Try and style using class or id selectors, not just the topline type selector. type selectors have the lowest CSS specificity value, are easily overwritten by other rules and also make it too easy to accidentally style elements you don't intend to.
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
