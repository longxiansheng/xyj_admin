<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" title="订单列表">
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template> -->
      <template #productCategory="{ record }">
        {{ (record.clientOrders.productCategory == 1)?"服务套餐":"服务人员" }}
      </template>
      <template #paymentsStatus="{ record }">
        <Tag v-if="!record.clientOrders.paymentsStatus" color="error">未支付</Tag>
        <Tag v-else color="success">已支付</Tag>
      </template>
      <template #needScheduling="{ record }">
        {{record.clientOrders.needScheduling?"是":"否"}}
      </template>
      <template #schedulingStatus="{ record }">
        <Tag v-if="record.clientOrders.productCategory == 1 && !record.clientOrders.schedulingStatus" color="error">待调度</Tag>
        <Tag v-else-if="record.clientOrders.productCategory == 1 && record.clientOrders.schedulingStatus==1" color="success">已调度</Tag>
        <div v-else-if="record.clientOrders.productCategory == 2">无</div>
      </template>
      <template #serviceStatus="{ record }">
        {{
          (record.clientOrders.serviceStatus == null ||record.clientOrders.serviceStatus == 0)?"未开始":(
            record.clientOrders.serviceStatus == 1?"服务中":(
              record.clientOrders.serviceStatus==2?"已完成":"已暂定"
            )
          )
          }}
      </template>
      <template #ordersStatus="{ record }">
        <Tag v-if="!record.clientOrders.ordersStatus" color="red">无效</Tag>
        <Tag v-else color="green">有效</Tag>
      </template>
      <template #orderCreationTime="{ record }">
        {{ record.clientOrders.orderCreationTime.substr(0,19).replace('T',' ')}}
      </template>
      <template #orderCancelTime="{ record }">
        {{ record.clientOrders.orderCancelTime?record.clientOrders.orderCancelTime.substr(0,19).replace('T',' '):""}}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleDetail.bind(null,record),
            },
            {
              label: '指派',
              ifShow:record.clientOrders.productCategory==1 && record.clientOrders.schedulingStatus == 0,
              onClick: handleScheduling.bind(null,record),
            }
          ]"
        />
      </template>
    </BasicTable>

    <DetailModal @register="DetailModal" @success="handleSuccess"></DetailModal>
  </PageWrapper>
</template>



<script lang="ts">
  import { defineComponent ,ref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicForm } from '/@/components/Form/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  // import { useGo } from '/@/hooks/web/usePage';
  import { Tag } from 'ant-design-vue';
  import { getBasicColumns, getFormConfig } from './tableData';
  // import { PageEnum } from '/@/enums/pageEnum';

   import DetailModal from './orderdetail.vue'

  import { GetOrdersByPaged } from '/@/api/order/order';
  export default defineComponent({
    components: { PageWrapper, BasicForm, BasicTable, TableAction ,Tag,DetailModal},
    setup() {
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '订单列表',
        titleHelpMessage: '订单列表',
        api: GetOrdersByPaged,
        rowKey: 'userOrders.id',
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

      const [DetailModal, { openModal }] = useModal();
      // const go = useGo();

      function afterFetch(data){
        console.log(data);
      }
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleSuccess({ values }) {
        console.log(values.id);
        // updateTableDataRecord(values.id, values);

        reload();
      }

      function handleDetail(record:Recordable) {
        console.log(record);
        // go({
        //   path:PageEnum.ORDER_DETAIL
        // });
        openModal(true, {
          record
        });
      }

      function handleScheduling(record: Recordable) {
        openModal(true, {
          record
        });
      }

      return {
        registerTable,
        DetailModal,
        handleCreate,
        handleSuccess,
        handleScheduling,
        handleDetail
      };
    }

  })
</script>
