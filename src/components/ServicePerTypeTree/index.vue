<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      title="人员类型列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'typeName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getServicePerTypeList } from '/@/api/dictionary/servicePerTypedictionary/servicePerTypedictionary';

  export default defineComponent({
    name: 'ServicePerTypeTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = ((await getServicePerTypeList()).items) as unknown as TreeItem[];
      }

      function handleSelect(keys: string) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
