<template>
  <CommentPreview v-for="comment in comments" :key="comment.id" :comment="comment" />
</template>

<script setup lang="ts">
import { PropType } from 'vue/dist/vue';
import { CommentPreview } from '~/entities/comment';
import { IComment } from '~/shared/api';

defineProps({
  comments: {
    type: Array as PropType<IComment[]>,
    required: true,
  },
});
</script>
