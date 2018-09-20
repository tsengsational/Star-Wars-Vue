<template>
  <div class="hello">
    <!-- FEEDBACK: again, use more descriptive variable names. Helps with readability -->
    <article v-for="(f, idx) in info" :key="idx">
      <h5>{{ f.title }}</h5>
      <h5>{{ f.release_date }}</h5>
    </article>
  </div>
</template>

<script>
export default {
  // i don't think vue components need a "name" property
  name: 'film',
  props: [
    'info'
  ]
}
</script>
