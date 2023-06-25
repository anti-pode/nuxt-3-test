<template>
  <ul>
    <li>id: {{ post.id }}</li>
    <li>userId: {{ post.userId }}</li>
    <li>title: {{ post.title }}</li>
    <li>body: {{ post.body }}</li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TPostPreview } from './types';

defineProps({
  post: {
    type: Object as PropType<TPostPreview>,
    required: true,
  },
});
</script>
