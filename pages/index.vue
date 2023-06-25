<template>
  <div>
    <header class="header">
      <NuxtLink to="create"><a-button type="primary">Создать пост</a-button></NuxtLink>
    </header>

    <PostTable />
  </div>
</template>

<script setup lang="ts">
import { PostTable } from '~/entities/post';
</script>

<style lang="scss">
.header {
  margin-bottom: 20px;
}
</style>
