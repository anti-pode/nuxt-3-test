<template>
  <div v-if="isPostExist">
    <header class="post-header">
      <a-button type="primary" @click="goHome">Вернуться на главную</a-button>
    </header>

    <PostWrapper :post="post" @updated="updateCurrentPost" />

    <CommentNewEditor :post="post" @created="addNewComment" />
    <CommentsList :post="post" :comments="comments" />
  </div>

  <div v-else class="post-doesnt-exist">
    <a-alert message="Такого поста не существует!" type="error" />

    <a-button type="primary" @click="goHome">Вернуться на главную</a-button>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { computed, Ref } from 'vue';
import { CommentsList, CommentNewEditor } from '~/widgets/comment';
import { PostWrapper } from '~/widgets/post';
import { IComment, IPost } from '@/shared/api';

const { $app } = useNuxtApp();

const router = useRouter();
const route = useRoute();

const postId: string = Array.isArray(route.params.postId) ? route.params.postId[0] : route.params.postId;
const { data: initialPost } = await useAsyncData('post-get', () => $app.api.postsAPI.getById(postId));
const post: Ref<IPost | null> = ref(initialPost);

const { data: initialComments } = await useAsyncData('comments-get', () => $app.api.commentsAPI.get(post.value!.id));
const comments: Ref<IComment[] | null> = ref(initialComments);

const isPostExist = computed(() => post.value && Object.keys(post.value).length > 0);

const addNewComment = (comment: IComment) => {
  comments.value?.unshift(comment);
};

// симуляция редактирования поста, так как на сервере данные не изменяются
const updateCurrentPost = (updatedPost: IPost) => {
  post.value = updatedPost;
};

const goHome = () => {
  router.push({
    path: '/',
  });
};
</script>

<style lang="scss" scoped>
.post-header {
  margin-bottom: 20px;
}

.post-doesnt-exist {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 20px;

  > :first-child {
    width: 100%;
  }
}
</style>
