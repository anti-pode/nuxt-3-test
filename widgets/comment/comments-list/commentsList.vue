<template>
  <div v-for="comment in currentComments" :key="comment.id">
    <CommentPreview v-if="comment.id !== currentEditorCommentId" :comment="comment" @deleted="handleCommentDelete" />
    <CommentCurrentEditor
      v-else
      :post="post"
      :comment="comment"
      @canceled="handleCancelEdit"
      @updated="handleCommentUpdate"
    />

    <a-button
      v-if="comment.id !== currentEditorCommentId"
      type="primary"
      @click="() => (currentEditorCommentId = comment.id)"
      >Редактировать</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue/dist/vue';
import { Ref } from 'vue';
import { CommentPreview } from '~/entities/comment';
import { IComment, IPost } from '~/shared/api';
import { CommentCurrentEditor } from '~/widgets/comment/';

const props = defineProps({
  comments: {
    type: Array as PropType<IComment[]>,
    required: true,
  },
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});

const currentEditorCommentId: Ref<number | null> = ref(null);
const currentComments: Ref<IComment[]> = ref(props.comments);

const handleCancelEdit = () => {
  currentEditorCommentId.value = null;
};

// симуляция редактирования коммента, так как на сервере данные не изменяются
const handleCommentUpdate = (data: IComment) => {
  currentEditorCommentId.value = null;

  const editCommentIndex = currentComments.value.findIndex(({ id }) => id === data.id);
  currentComments.value?.splice(editCommentIndex, 1, data);
};

// симуляция удаления коммента, так как на сервере данные не изменяются
const handleCommentDelete = (comment: IComment) => {
  const deleteCommentIndex = currentComments.value.findIndex(({ id }) => id === comment.id);
  currentComments.value?.splice(deleteCommentIndex, 1);
};
</script>
