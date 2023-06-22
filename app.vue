<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
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
