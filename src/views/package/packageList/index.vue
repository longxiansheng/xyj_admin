<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" title="年龄阶段">
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑年龄阶段'
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除年龄阶段',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>
    <CreateOrUpdateDrawer @register="createorupdate" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';

  import { getBasicColumns, getFormConfig } from './tableData';

  import { GetAgeStageDictionaryByPaged, DelAgeStageDictionaryById } from '/@/api/dictionary/ageStageDictionary/ageStageDictionary';

  import CreateOrUpdateDrawer from './CreateOrUpdateDrawer.vue';

  export default defineComponent({
    components: { PageWrapper, BasicForm, BasicTable, TableAction, CreateOrUpdateDrawer },
    setup() {
      const [createorupdate, { openDrawer: opencreateorupdate }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '年龄阶段',
        titleHelpMessage: '年龄阶段列表',
        api: GetAgeStageDictionaryByPaged,
        rowKey: 'id',
        columns: getBasicColumns(),
        useSearchForm: true,
        showTableSetting: true,
        formConfig: getFormConfig(),
        bordered: true,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        }
      })

      function handleCreate() {
        opencreateorupdate(true, {

        });
      }

      function handleDelete(record: Recordable) {
        DelAgeStageDictionaryById({id :record.id}).then(()=>{
          reload();
        })
      }

      return {
        registerTable,
        createorupdate,
        handleCreate,
        handleDelete
      };
    }
  })

</script>
