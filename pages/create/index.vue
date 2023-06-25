<template>
  <PostNewEditor @created="navigateToPost" />
</template>

<script setup lang="ts">
import { PostNewEditor } from '@/widgets/post';
import { IPost } from '@/shared/api';

const router = useRouter();

const navigateToPost = (data: IPost) => {
  router.push({
    name: 'postId',
    params: {
      postId: data.id,
    },
  });
};
</script>
