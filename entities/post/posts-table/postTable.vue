<template>
  <a-table
    v-if="currentPost"
    :row-key="(post) => post.id"
    :data-source="currentPost"
    :columns="columns"
    :pagination="false"
  >
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, column, clearFilters }">
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          placeholder="Поиск по названию"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @press-enter="handleSearch(selectedKeys, column.dataIndex, confirm)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, column.dataIndex, confirm)"
        >
          Найти
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters, confirm)">Сбросить</a-button>
      </div>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <NuxtLink :to="`/${record.id}`">Смотреть</NuxtLink>
        </span>
      </template>
    </template>
  </a-table>

  <a-pagination
    v-model:current="currentPage"
    :total="POSTS_TOTAL"
    :default-page-size="POSTS_PAGE_LIMIT"
    :show-size-changer="false"
    show-less-items
    @change="fetchTableData"
  />
</template>

<script setup lang="ts">
import { useAsyncData } from '#app';
import { ColumnsType } from 'ant-design-vue/es/table';
import { Ref } from 'vue';
import { FilterDropdownProps } from 'ant-design-vue/es/table/interface';
import { IPost } from '~/shared/api';
const { $app } = useNuxtApp();

const POSTS_PAGE_LIMIT = 10;
const POSTS_TOTAL = 100;

const searchInput: Ref<HTMLInputElement | null> = ref(null);
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
    customFilterDropdown: true,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.value?.focus(), 100);
      }
    },
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

const currentPage: Ref<number> = ref(1);
const currentPost: Ref<IPost[] | null> = ref(null);
const currentFilter: Ref<[string, string] | null> = ref(null);

const fetchTableData = async () => {
  const { data } = await useAsyncData('posts-get', () =>
    $app.api.postsAPI.get({
      page: currentPage,
      limit: POSTS_PAGE_LIMIT,
      filter: currentFilter,
    })
  );

  currentPost.value = data.value;
};

const handleSearch = ([selectedKey]: [string], dataIndex: string, confirm: FilterDropdownProps<IPost>['confirm']) => {
  currentFilter.value = [dataIndex, selectedKey];
  currentPage.value = 1;

  confirm();
  fetchTableData();
};

const handleReset = (
  clearFilters: FilterDropdownProps<IPost>['clearFilters'],
  confirm: FilterDropdownProps<IPost>['confirm']
) => {
  currentFilter.value = null;
  currentPage.value = 1;

  if (clearFilters) {
    clearFilters();
  }

  confirm();
  fetchTableData();
};

fetchTableData();
</script>