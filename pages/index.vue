<template>
  <div>
    <a-button type="primary">Primary Button</a-button>

    {{ testQuery }}
  </div>
</template>

<script setup lang="ts">
const testQuery = await useFetch('https://jsonplaceholder.typicode.com/posts');
</script>
