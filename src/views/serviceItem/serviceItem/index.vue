<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" title="服务项目">
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
      <template #fromPerson="{ record }">
        {{ record.item.fromPerson == 1?"运维人员":"服务人员" }}
      </template>
      <template #status="{ record }">
        <Tag v-if="record.item.status == 1" color="success">通过</Tag>
        <Tag v-else color="error">未通过</Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:plus-line',
              tooltip: '添加子项目',
              onClick: handleAdd.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑项目',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '编辑项目',
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
  import { defineComponent  } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { getBasicColumns, getFormConfig } from './tableData';
  import CreateOrUpdate from './createOrUpdate.vue';
  import { GetServiceItemByPaged, DelServiceItemById } from '/@/api/serviceItem/serviceItem';

  export default defineComponent({
    components: { PageWrapper, BasicForm, BasicTable, CreateOrUpdate,TableAction,Tag },
   setup() {
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '服务项目',
        titleHelpMessage: '服务项目列表',
        isTreeTable: true,
        api: GetServiceItemByPaged,
        rowKey: 'item.id',
        columns: getBasicColumns(),
        afterFetch:afterFetch,
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

      function afterFetch(data){
        var result=[];
        data.forEach(e => {
          let obj= {
            item:e.item,
            children:e.childs
          };
          result.push(obj);
        });
       return result;
      }
      function handleCreate() {
        openModal(true, {
          isUpdate: true,
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
        DelServiceItemById({id :record.item.id}).then(()=>{
          reload();
        })
      }

      return {
        registerTable,
        createorupdate,
        handleCreate,
        handleSuccess,
        handleEdit,
        handleDelete,
        handleAdd
      };
    }
  })
</script>
