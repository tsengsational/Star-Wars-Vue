<template>
  <div class="hello">
    <article v-for="(f, idx) in info" :key="idx">
      <h5>{{ f.title }}</h5>
      <h5>{{ f.release_date }}</h5>
    </article>
  </div>
</template>

<script>
export default {
  name: 'film',
  props: [
    'info'
  ]
}
</script>
