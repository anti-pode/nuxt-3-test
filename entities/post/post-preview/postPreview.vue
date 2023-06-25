<template>
  <ul>
    <li>id: {{ post.id }}</li>
    <li>userId: {{ post.userId }}</li>
    <li>title: {{ post.title }}</li>
    <li>body: {{ post.body }}</li>
  </ul>

  <a-button type="default" @click="deleteCurrentPost">Удалить</a-button>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TPostPreview } from './types';

const { $app } = useNuxtApp();

const props = defineProps({
  post: {
    type: Object as PropType<TPostPreview>,
    required: true,
  },
});

const emit = defineEmits(['deleted']);

const deleteCurrentPost = async () => {
  await useAsyncData('post-delete', () => $app.api.postsAPI.delete(props.post.id));

  emit('deleted');
};
</script>
