<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />

    <main class="app-wrapper">
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { title, htmlAttrs, description } = useAppConfig();

useHead({
  title,
  htmlAttrs,
});

useSeoMeta({
  description,
});
</script>

<style lang="scss">
.app-wrapper {
  padding: 20px;
}
</style>
