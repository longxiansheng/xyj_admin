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
              tooltip: '编辑年龄阶段',
              onClick: handleEdit.bind(null, record),
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
    <CreateOrUpdate @register="createorupdate" @success="handleSuccess"></CreateOrUpdate>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { getBasicColumns, getFormConfig } from './tableData';

  import { GetAgeStageDictionaryByPaged, DelAgeStageDictionaryById } from '/@/api/dictionary/ageStageDictionary/ageStageDictionary';

  import CreateOrUpdate from './createOrUpdate.vue';

  export default defineComponent({
    components: { PageWrapper, BasicForm, BasicTable, TableAction, CreateOrUpdate },
    setup() {
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
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

      const [createorupdate, { openModal }] = useModal();

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          updateTableDataRecord(values.id, values);
        } else {
          reload();
        }
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true
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
        handleSuccess,
        handleEdit,
        handleDelete
      };
    }
  })

</script>
