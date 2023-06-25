<template>
  <div>
    <PostPreview v-if="mode === Mode.Preview" :post="post" @deleted="goToPosts" />
    <PostCurrentEditor v-if="mode === Mode.Edit" :post="post" @updated="changeModeAfterPostUpdate" />

    <a-button v-if="mode === Mode.Preview" type="primary" @click="() => (mode = Mode.Edit)">Реадктировать</a-button>
    <a-button v-if="mode === Mode.Edit" type="default" @click="() => (mode = Mode.Preview)">Отменить</a-button>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { Ref } from 'vue';
import { PostPreview } from '@/entities/post';
import { PostCurrentEditor } from '@/widgets/post';
import { IPost } from '@/shared/api';

const { $app } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const postId: string = Array.isArray(route.params.postId) ? route.params.postId[0] : route.params.postId;
const { data: initialPost } = await useAsyncData('post-get', () => $app.api.postsAPI.getById(postId));
const post: Ref<IPost | null> = ref(initialPost);

enum Mode {
  Preview,
  Edit,
}

const mode: Ref<Mode> = ref(Mode.Preview);

const changeModeAfterPostUpdate = (data: IPost) => {
  mode.value = Mode.Preview;
  post.value = data;
};

const goToPosts = () => {
  router.push({
    path: '/',
  });
};
</script>
