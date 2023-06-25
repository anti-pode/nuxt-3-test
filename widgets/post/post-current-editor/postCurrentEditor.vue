<template>
  <PostEditor :post="post" @submit="updatePost" />
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { PropType } from 'vue';
import { IPostEditor, IPost } from './types';
import { PostEditor } from '~/entities/post';

const { $app } = useNuxtApp();

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});

const emit = defineEmits<{
  updated: [data: IPost];
}>();

const updatePost = async (data: IPostEditor) => {
  const { data: responseData } = await useAsyncData('post-update', () => $app.api.postsAPI.update(props.post.id, data));

  emit('updated', { ...props.post, ...responseData.value });
};
</script>
