<template>
  <a-card size="small" class="card">
    <CommentEditor hide-cancel-button @submit="createComment" />
  </a-card>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { PropType } from 'vue/dist/vue';
import { ICommentEditor } from './types';
import { CommentEditor } from '~/entities/comment';
import { IComment, IPost } from '~/shared/api';

const { $app } = useNuxtApp();

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});

const emit = defineEmits<{
  created: [data: IComment];
}>();

const createComment = async (data: ICommentEditor) => {
  // TODO: получать name и email из .env
  const { data: responseData } = await useAsyncData('comment-create', () =>
    $app.api.commentsAPI.create({ ...data, postId: props.post.id, name: 'Тест Тестович', email: 'test@test.ru' })
  );

  emit('created', responseData.value!);
};
</script>

<style lang="scss" scoped>
.card {
  margin: 20px 0 40px 0;
}
</style>
