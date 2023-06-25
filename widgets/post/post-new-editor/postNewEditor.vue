<template>
  <PostEditor @submit="createPost" @cancel="onCancel" />
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { IPostEditor } from './types';
import { PostEditor } from '~/entities/post';
import { IPost } from '~/shared/api';

const config = useRuntimeConfig();
const { user } = config.public;

const { $app } = useNuxtApp();

const emit = defineEmits<{
  created: [data: IPost];
  cancel: [void];
}>();

const createPost = async (data: IPostEditor) => {
  const { data: responseData } = await useAsyncData('post-create', () =>
    $app.api.postsAPI.create({ ...data, userId: Number(user.id) })
  );

  emit('created', responseData.value!);
};

const onCancel = () => {
  emit('cancel');
};
</script>
