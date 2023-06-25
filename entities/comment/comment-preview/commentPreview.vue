<template>
  <article>
    <ul>
      <li>id: {{ comment.id }}</li>
      <li>postId: {{ comment.postId }}</li>
      <li>name: {{ comment.name }}</li>
      <li>email: {{ comment.email }}</li>
      <li>body: {{ comment.body }}</li>
    </ul>

    <footer class="comment-actions">
      <a-button type="default" @click="deleteCurrentComment">Удалить</a-button>
      <a-button type="primary" @click="editCurrentComment">Редактировать</a-button>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TCommentPreview } from './types';
import { IComment } from '~/shared/api';

const { $app } = useNuxtApp();

const props = defineProps({
  comment: {
    type: Object as PropType<TCommentPreview>,
    required: true,
  },
});

const emit = defineEmits<{
  deleted: [comment: IComment];
  edit: [comment: IComment];
}>();

const deleteCurrentComment = async () => {
  await useAsyncData('comment-delete', () => $app.api.commentsAPI.delete(props.comment.id));

  emit('deleted', props.comment);
};

const editCurrentComment = () => {
  emit('edit', props.comment);
};
</script>

<style lang="scss" scoped>
.comment-actions {
  display: flex;
  column-gap: 10px;
}
</style>
