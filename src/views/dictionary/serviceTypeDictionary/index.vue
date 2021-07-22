<template>
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" title="人员等级">
      <ServicePerTypeTree class="w-1/4 xl:w-1/5" @select="handleSelect"/>
      <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate">添加</a-button>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                icon: 'clarity:plus-line',
                tooltip: '添加子服务类型',
                onClick: handleAdd.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑服务类型',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除服务类型',
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
  import { defineComponent, reactive } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { getBasicColumns, getFormConfig } from './tableData';

  import { GetServiceTypeDictionaryByPaged, DelServiceTypeDictionaryById } from '/@/api/dictionary/serviceTypeDictionary/serviceTypeDictionary';

  import CreateOrUpdate from './createOrUpdate.vue';
  import ServicePerTypeTree from '/@/components/ServicePerTypeTree/index.vue'

  export default defineComponent({
    components: { PageWrapper, BasicTable, TableAction, CreateOrUpdate, ServicePerTypeTree },
    setup() {
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '服务类型',
        titleHelpMessage: '人员服务类型',
        isTreeTable: true,
        api: GetServiceTypeDictionaryByPaged,
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
        }
        reload();
      }

      function handleAdd(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          isAddChildren: true
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true
        });
      }

      function handleDelete(record: Recordable) {
        DelServiceTypeDictionaryById({id :record.id}).then(()=>{
          reload();
        })
      }

      function handleSelect(typeIdFilter = '') {
        searchInfo.typeIdFilter = typeIdFilter;
        reload();
      }

      return {
        registerTable,
        createorupdate,
        handleCreate,
        handleSuccess,
        handleEdit,
        handleDelete,
        handleSelect,
        searchInfo,
        handleAdd
      };
    }
  })

</script>
