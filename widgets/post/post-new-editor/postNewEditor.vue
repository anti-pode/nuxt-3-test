<template>
  <PostEditor @submit="createPost" />
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { IPostEditor } from './types';
import { PostEditor } from '~/entities/post';
import { IPost } from '~/shared/api';

const { $app } = useNuxtApp();

const emit = defineEmits<{
  created: [data: IPost];
}>();

const createPost = async (data: IPostEditor) => {
  // TODO: получать userId из .env
  const { data: responseData } = await useAsyncData('post-create', () =>
    $app.api.postsAPI.create({ ...data, userId: 1 })
  );

  emit('created', responseData.value!);
};
</script>
