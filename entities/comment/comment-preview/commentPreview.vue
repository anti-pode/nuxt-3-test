<template>
  <ul>
    <li>id: {{ comment.id }}</li>
    <li>postId: {{ comment.postId }}</li>
    <li>name: {{ comment.name }}</li>
    <li>email: {{ comment.email }}</li>
    <li>body: {{ comment.body }}</li>
  </ul>

  <a-button type="default" @click="deleteCurrentComment">Удалить</a-button>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TCommentPreview } from './types';

const { $app } = useNuxtApp();

const props = defineProps({
  comment: {
    type: Object as PropType<TCommentPreview>,
    required: true,
  },
});

const emit = defineEmits(['deleted']);

const deleteCurrentComment = async () => {
  await useAsyncData('comment-delete', () => $app.api.commentsAPI.delete(props.comment.id));

  emit('deleted');
};
</script>
