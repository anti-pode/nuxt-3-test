<template>
  <a-card size="small">
    <PostPreview v-if="mode === Mode.Preview" :post="post" @deleted="goToPosts" @edit="handlePostEdit" />
    <PostCurrentEditor v-if="mode === Mode.Edit" :post="post" @updated="handlePostUpdate" @cancel="handleCancelEdit" />
  </a-card>
</template>

<script setup lang="ts">
import { Ref } from 'vue/dist/vue';
import { PropType } from 'vue';
import { PostPreview } from '@/entities/post';
import { PostCurrentEditor } from '@/widgets/post';
import { IPost } from '~/shared/api';

const router = useRouter();

defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
});

const emit = defineEmits<{
  updated: [data: IPost];
}>();

enum Mode {
  Preview,
  Edit,
}

const mode: Ref<Mode> = ref(Mode.Preview);

const handlePostUpdate = (data: IPost) => {
  mode.value = Mode.Preview;
  emit('updated', data);
};

const handlePostEdit = () => {
  mode.value = Mode.Edit;
};

const handleCancelEdit = () => {
  mode.value = Mode.Preview;
};

const goToPosts = () => {
  router.push({
    path: '/',
  });
};
</script>

<style scoped></style>
