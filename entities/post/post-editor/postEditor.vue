<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onSubmit"
  >
    <a-form-item label="Название поста" name="title" :rules="[{ required: true, message: 'Добавьте название!' }]">
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item label="Содержание поста" name="body" :rules="[{ required: true, message: 'Добавьте содержание!' }]">
      <a-textarea v-model:value="formState.body" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IPostEditor } from './types';

const props = defineProps({
  post: {
    type: Object as PropType<IPostEditor>,
    default: () => ({
      title: '',
      body: '',
    }),
  },
});

const emit = defineEmits<{
  submit: [data: IPostEditor];
}>();

const formState = reactive<IPostEditor>({
  title: props.post.title,
  body: props.post.body,
});

const onSubmit = (data: IPostEditor) => {
  emit('submit', data);
};
</script>
