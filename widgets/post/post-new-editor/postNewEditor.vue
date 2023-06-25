<template>
  <PostEditor @submit="createPost" />
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { IPostEditor } from './types';
import { PostEditor } from '~/entities/post';

const { $app } = useNuxtApp();

const emit = defineEmits(['created']);

const createPost = async (data: IPostEditor) => {
  // TODO: получать userId из .env
  await useAsyncData('post-create', () => $app.api.postsAPI.create({ ...data, userId: 1 }));

  emit('created');
};
</script>
