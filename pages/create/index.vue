<template>
  <PostNewEditor @created="navigateToPost" @cancel="goToPosts" />
</template>

<script setup lang="ts">
import { PostNewEditor } from '@/widgets/post';
import { IPost } from '@/shared/api';

const router = useRouter();

// вернет на пустую страницу, так как на сервере данные не изменяются
const navigateToPost = (data: IPost) => {
  router.push({
    name: 'postId',
    params: {
      postId: data.id,
    },
  });
};

const goToPosts = () => {
  router.push({
    path: '/',
  });
};
</script>
