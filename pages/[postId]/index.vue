<template>
  <div>
    <PostPreview v-if="mode === Mode.Preview" :post="post" />
    <PostCurrentEditor v-if="mode === Mode.Edit" :post="post" @updated="changeModeAfterPostUpdate" />

    <a-button v-if="mode === Mode.Preview" type="primary" @click="() => (mode = Mode.Edit)">Реадктировать</a-button>
    <a-button v-if="mode === Mode.Edit" type="default" @click="() => (mode = Mode.Preview)">Отменить</a-button>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { PostPreview } from '@/entities/post';
import { PostCurrentEditor } from '@/widgets/post';
import { IPost } from '@/shared/api';

const { $app } = useNuxtApp();
const route = useRoute();

const postId: string = Array.isArray(route.params.postId) ? route.params.postId[0] : route.params.postId;
const { data: initialPost } = await useAsyncData('post', () => $app.api.postsAPI.getById(postId));
const post = ref(initialPost);

enum Mode {
  Preview,
  Edit,
}

const mode = ref(Mode.Preview);

const changeModeAfterPostUpdate = (data: IPost) => {
  mode.value = Mode.Preview;
  post.value = data;
};
</script>
