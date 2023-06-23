<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <p>{{ post.id }}</p>
        <p>{{ post.title }}</p>
        <p>{{ post.body }}</p>

        <a-button type="primary" @click="() => (postId = post.id)">get post comments</a-button>
      </li>
    </ul>

    <br />
    <br />

    {{ comments }}
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
const { $app } = useNuxtApp();

const page = ref(1);
const postId = ref();

const { data: posts } = await useAsyncData('posts', () => $app.api.postsAPI.getPage(page), {
  watch: [page],
});

const { data: comments } = await useAsyncData('comments', () => $app.api.commentsAPI.get(postId), {
  watch: [postId],
  immediate: false,
});
</script>
