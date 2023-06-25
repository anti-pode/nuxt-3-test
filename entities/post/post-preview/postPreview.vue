<template>
  <article>
    <ul>
      <li>id: {{ post.id }}</li>
      <li>userId: {{ post.userId }}</li>
      <li>title: {{ post.title }}</li>
      <li>body: {{ post.body }}</li>
    </ul>

    <footer class="post-actions">
      <a-button type="default" @click="deleteCurrentPost">Удалить</a-button>
      <a-button type="primary" @click="editCurrentPost">Редактировать</a-button>
    </footer>
  </article>
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

const emit = defineEmits(['deleted', 'edit']);

const deleteCurrentPost = async () => {
  await useAsyncData('post-delete', () => $app.api.postsAPI.delete(props.post.id));

  emit('deleted');
};

const editCurrentPost = () => {
  emit('edit');
};
</script>

<style lang="scss" scoped>
.post-actions {
  display: flex;
  column-gap: 10px;
}
</style>
