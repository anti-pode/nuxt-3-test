<template>
  <div>
    <NuxtLink to="create"><a-button type="primary">Создать пост</a-button></NuxtLink>

    <a-table :row-key="(post) => post.id" :data-source="posts" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <NuxtLink :to="`/${record.id}`">Смотреть</NuxtLink>
          </span>
        </template>
      </template>
    </a-table>

    <br />
    <br />

    {{ comments }}
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { ColumnsType } from 'ant-design-vue/es/table';
const { $app } = useNuxtApp();

const page = ref(1);
const postId = ref();

const columns: ColumnsType<string> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'ID пользователя',
    dataIndex: 'userId',
    key: 'userId',
    sorter: true,
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    sorter: true,
  },
  {
    title: 'Краткое содержание',
    dataIndex: 'body',
    key: 'body',
  },
  {
    title: '',
    key: 'action',
  },
];

const { data: posts } = await useAsyncData('posts', () => $app.api.postsAPI.getPage(page), {
  watch: [page],
});

const { data: comments } = await useAsyncData('comments', () => $app.api.commentsAPI.get(postId), {
  watch: [postId],
  immediate: false,
});
</script>
