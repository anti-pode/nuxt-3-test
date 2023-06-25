<template>
  <a-form
    :model="formState"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    layout="vertical"
    name="basic"
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
      <footer class="form-footer">
        <a-button type="default" @click="onCancel">Отменить</a-button>
        <a-button type="primary" html-type="submit">Отправить</a-button>
      </footer>
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
  cancel: [void];
}>();

const formState = reactive<IPostEditor>({
  title: props.post.title,
  body: props.post.body,
});

const onSubmit = (data: IPostEditor) => {
  emit('submit', data);
};

const onCancel = () => {
  emit('cancel');
};
</script>

<style lang="scss" scoped>
.form-footer {
  display: flex;
  column-gap: 10px;
}
</style>
