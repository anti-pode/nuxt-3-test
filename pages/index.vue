<template>
  <div>
    <a-button type="primary">Primary Button</a-button>

    {{ testQuery }}
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
const { $app } = useNuxtApp();

const testQuery = await useAsyncData('posts', () => $app.api.postsAPI.get());
</script>
