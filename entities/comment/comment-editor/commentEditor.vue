<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onSubmit"
  >
    <a-form-item label="Текст комментария" name="body" :rules="[{ required: true, message: 'Добавьте текст!' }]">
      <a-textarea v-model:value="formState.body" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Отправить</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ICommentEditor } from './types';

const props = defineProps({
  comment: {
    type: Object as PropType<ICommentEditor>,
    default: () => ({
      body: '',
    }),
  },
});

const emit = defineEmits<{
  submit: [data: ICommentEditor];
}>();

const formState = reactive<ICommentEditor>({
  body: props.comment.body,
});

const onSubmit = (data: ICommentEditor) => {
  emit('submit', data);
};
</script>
