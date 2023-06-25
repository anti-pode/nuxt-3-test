<template>
  <CommentEditor :comment="comment" @submit="createComment" @cancel="cancelEdit" />
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
  comment: {
    type: Object as PropType<IComment>,
    required: true,
  },
});

const emit = defineEmits<{
  updated: [data: IComment];
  canceled: [commentId: IComment['id']];
}>();

const createComment = async (data: ICommentEditor) => {
  const { data: responseData } = await useAsyncData('comment-update', () =>
    $app.api.commentsAPI.update(props.post.id, props.comment.id, data)
  );

  emit('updated', { ...props.comment, ...responseData.value });
};

const cancelEdit = () => {
  emit('canceled', props.comment.id);
};
</script>
