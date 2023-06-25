<template>
  <div>
    <NuxtLink to="create"><a-button type="primary">Создать пост</a-button></NuxtLink>

    <PostTable />
  </div>
</template>

<script setup lang="ts">
import { PostTable } from '~/entities/post';
</script>
