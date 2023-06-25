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
    <a-form-item label="Текст комментария" name="body" :rules="[{ required: true, message: 'Добавьте текст!' }]">
      <a-textarea v-model:value="formState.body" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <footer class="form-footer">
        <a-button v-if="!hideCancelButton" @click="onCancel">Отменить</a-button>
        <a-button type="primary" html-type="submit">Отправить</a-button>
      </footer>
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
  hideCancelButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  submit: [data: ICommentEditor];
  cancel: [void];
}>();

const formState = reactive<ICommentEditor>({
  body: props.comment.body,
});

const onSubmit = (data: ICommentEditor) => {
  formState.body = '';

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
