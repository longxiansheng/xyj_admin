<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" title="年龄阶段">
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
      <template #serviceLength="{ record }">
        <span>{{record.package.serviceLength}}{{record.package.unit == 1 ? '天': (record.package.unit == 2 ? '月（26天）' : '年')}}</span>
      </template>
      <template #status="{ record }">
        <Tag v-if="record.package.status == true" color="success">上架</Tag>
        <Tag v-else color="error">下架</Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑套餐',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除套餐',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record)
              }
            }
          ]"
        />
      </template>
    </BasicTable>
    <CreateOrUpdateDrawer @register="createorupdate" @success="success"/>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';

  import { getBasicColumns, getFormConfig } from './tableData';

  import { GetPackageByPaged, DelPackageById } from '/@/api/package/packageList/packageList';

  import CreateOrUpdateDrawer from './CreateOrUpdateDrawer.vue';

  export default defineComponent({
    components: { PageWrapper, BasicForm, BasicTable, TableAction, CreateOrUpdateDrawer, Tag },
    setup() {
      const [createorupdate, { openDrawer: opencreateorupdate }] = useDrawer();

      const [registerTable , { reload }] = useTable({
        title: '套餐',
        titleHelpMessage: '套餐列表',
        api: GetPackageByPaged,
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
          isUpdate: false
        });
      }

      function handleEdit(record: Recordable) {
        opencreateorupdate(true, {
          data: record,
          isUpdate: true
        });
      }

      function handleDelete(record: Recordable) {
        DelPackageById({id :record.package.fId}).then(()=>{
          reload();
        })
      }

      function success(){
        reload();
      }

      return {
        registerTable,
        createorupdate,
        handleCreate,
        handleDelete,
        handleEdit,
        success
      };
    }
  })

</script>
