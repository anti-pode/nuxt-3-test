<template>
  <div>
    <a-button type="primary">Primary Button</a-button>

    {{ testQuery }}

    <br />
    <br />
    <a-button @click="() => (page += 1)">increase page</a-button>
    {{ page }}
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
const { $app } = useNuxtApp();

const page = ref(1);

const { data: testQuery } = await useAsyncData('posts', () => $app.api.postsAPI.getPage(page), {
  watch: [page],
});
</script>
