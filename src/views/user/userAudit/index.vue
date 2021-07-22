<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" title="用户审核">
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #userStatus="{ record }">
        <Tag color="gray" v-if="record.userStatus==0">
          未完善
        </Tag>
        <Tag color="orange" v-if="record.userStatus==1">
          待审核
        </Tag>
        <Tag color="green" v-if="record.userStatus==2">
          审核成功
        </Tag>
        <Tag color="red" v-if="record.userStatus==3">
          审核不通过
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '审批',
              popConfirm: {
                okText: '通过',
                cancelText: '不通过',
                title: '审批',
                confirm: handleApproval.bind(null, record.id, 1),
                cancel: handleApproval.bind(null, record.id, 2)
              },
              ifShow:record.userStatus == 1
            }
          ]"
        />
      </template>
    </BasicTable>
    <DrawerDetail @register="registerDetail" @success="handleSuccess"/>
    <ApprovalComments @register="approvalComments" @success="handleSuccess"></ApprovalComments>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { Tag } from 'ant-design-vue';

  import { getBasicColumns, getFormConfig } from './tableData';

  import { GetUserAuditByPaged } from '/@/api/user/userAudit/userAudit';

  import DrawerDetail from './DrawerDetail.vue';
  import ApprovalComments from './ApprovalComments.vue';

  export default defineComponent({
    components: { PageWrapper, BasicForm, BasicTable, TableAction, DrawerDetail, Tag, ApprovalComments },
    setup() {
      const [registerDetail, { openDrawer: openDetail }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '用户审核',
        titleHelpMessage: '用户列表',
        api: GetUserAuditByPaged,
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

      const [approvalComments, { openModal }] = useModal();

      function handleApproval(id, value){
        openModal(true, {
          Id: id,
          ApprovalStatus: value
        });
      }

      function handleSuccess() {
        reload();
      }

      function handleView(record: Recordable) {
        openDetail(true, {
          data: record
        });
      }

      return {
        registerTable,
        approvalComments,
        handleSuccess,
        handleView,
        registerDetail,
        handleApproval
      };
    }
  })

</script>
